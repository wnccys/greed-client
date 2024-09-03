"use client";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, YAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@renderer/ShadComponents/ui/card";
import {
	type ChartConfig,
	ChartContainer,
} from "@renderer/ShadComponents/ui/chart";
import { Progress } from "@renderer/ShadComponents/ui/progress";
import { useDownloads } from "@renderer/Hooks/downloads";
import { Button } from "@renderer/ShadComponents/ui/button";
import { useEffect, useState } from "react";

type chartData = {
	downloaded: number;
	downloadSpeed: number;
	diskUsage: number;
};

const chartConfig = {
	downloaded: {
		label: "Mbps",
	},
	downloadSpeed: {
		label: "Download Speed (Mbps)",
		color: "hsl(var(--chart-1))",
	},
	diskUsage: {
		label: "Disk Usage",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function Downloads() {
	const [activeChart, setActiveChart] =
		React.useState<keyof typeof chartConfig>("downloadSpeed");
	const [chartData, setChartData] = useState<chartData[]>([]);
	const torrentInfo = useDownloads();
	const [isPaused, setIsPaused] = useState<boolean>();
	// const [isDownloadBlocked, setIsDownloadBlocked] = useState<boolean>(false);
	const [queue, setQueue] = useState<QueueItem[]>([]);
	const total = React.useMemo(
		() => ({
			downloadSpeed: (torrentInfo.downloadSpeed / 8).toFixed(1) || 0,
			diskUsage: 0,
		}),
		[torrentInfo],
	);

	// useEffect(() => {
	// 	window.electron.ipcRenderer.on("isNoLongerLoading" , () => {
	// 		setIsDownloadBlocked(false);
	// 	})
	// }, []);

	useEffect(() => {
		window.electron.ipcRenderer.on(
			"updateQueueItems",
			(_event, queueItems: QueueItem[]) => {
				setQueue(queueItems);
			},
		);

		return () => {
			window.electron.ipcRenderer.removeAllListeners("updateQueueItems");
		};
	});

	useEffect(() => {
		window.electron.ipcRenderer
			.invoke("getCurrentQueueItems")
			.then((queueItems: QueueItem[]) => {
				setQueue(queueItems);
			});
	}, []);

	useEffect(() => {
		console.log("queue items: ", queue);
	});

	useEffect(() => {
		const newData: chartData = {
			downloaded: torrentInfo.downloaded,
			downloadSpeed: torrentInfo.downloadSpeed,
			diskUsage: torrentInfo.currentProgress,
		};

		setChartData((oldChartData) => {
			const updatedChartData = [...oldChartData, newData];
			if (updatedChartData.length > 50) {
				updatedChartData.shift();
			}

			return updatedChartData;
		});
	}, [torrentInfo]);

	useEffect(() => {
		window.electron.ipcRenderer.on(
			"updateTorrentPauseStatus",
			(_event, status: boolean) => {
				setIsPaused(status);
			},
		);
	}, []);

	function GameContainer() {
		if (torrentInfo.currentProgress >= 0 && torrentInfo.timeRemaining) {
			return (
				<div className="flex h-1/2rem">
					<DownloadCard game={torrentInfo.game} />
					<div className="ms-6 flex flex-col w-full gap-2">
						<DownloadTimeRemaining timeRemaining={torrentInfo.timeRemaining} />{" "}
						<br />
						Peers: {torrentInfo.peers}
						<div>
							<p>{(torrentInfo.downloadSpeed / 8).toFixed(1)} Mbps</p>
							<div className="flex gap-2 mt-2">
								<ResumePauseTorrent
									isPaused={isPaused}
									torrentURI={torrentInfo.uri}
									className="mt-1 hover:bg-zinc-800 hover:-translate-y-1
							hover:duration-500 transition-all"
									// setIsDownloadBlocked={setIsDownloadBlocked}
									// isDownloadBlocked={isDownloadBlocked}
								/>
								<Button
									onClick={() => window.api.removeTorrent(torrentInfo.uri)}
									className="mt-1 hover:bg-red-500 hover:-translate-y-1
						hover:duration-500 transition-all"
								>
									Remove
								</Button>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return "Downloads Will Appear Here.";
	}

	function QueueGameContainer() {
		if (queue.length > 0) {
			return (
				<>
					<h1 className="text-2xl mt-10">Queue</h1>
					<div
						className="size-24 w-full h-full flex flex-col border 
		border-white bg-zinc-950 rounded-xl gap-2 p-5 pb-10 shadow-xl shadow-black"
					>
						{queue.map((queueItem, index) => {
							return (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<div className="flex h-1/2rem" key={index}>
									<div className="flex items-center gap-5">
										<img src="https://placehold.co/75" alt="game-image" />
										<div className="text-sm">{queueItem.name}</div>
										<div className="w-[28.5vw]">
											<div className="pe-4 flex">
												<div>{queueItem.progress}%</div>
												<div className="flex  w-full justify-end">
													<p>{(Number(queueItem.size) / 1000).toFixed(1)} GB</p>
												</div>
											</div>
											<Progress value={queueItem.progress} />
										</div>
									</div>
									<div className="ms-6 flex flex-col w-full gap-2">
										<div>
											<div className="flex gap-2 mt-2">
												<ResumePauseTorrent
													isPaused={true}
													torrentURI={queueItem.torrentId}
													className="mt-1 hover:bg-zinc-800 hover:-translate-y-1
									hover:duration-500 transition-all"
													// setIsDownloadBlocked={setIsDownloadBlocked}
													// isDownloadBlocked={isDownloadBlocked}
												/>
												<Button
													onClick={() =>
														window.api.removeTorrent(queueItem.torrentId)
													}
													// {...(isDownloadBlocked ? { disabled: true } : null)}
													className="mt-1 hover:bg-red-500 hover:-translate-y-1
								hover:duration-500 transition-all"
												>
													Remove
												</Button>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</>
			);
		}

		return null;
	}

	function DownloadCard({ game }) {
		if (torrentInfo.currentProgress > 0) {
			return (
				<div className="flex items-center gap-5">
					<img src="https://placehold.co/75" alt="game-image" />
					<div className="text-sm pe-2">{game}</div>
					<div className="w-[28vw]">
						<div className="pe-4 flex">
							<div>{torrentInfo.currentProgress}%</div>
							<div className="flex ps-10 w-full justify-end">
								<p>
									{torrentInfo.downloaded} / {torrentInfo.totalSize} MB
								</p>
							</div>
						</div>
						<Progress value={torrentInfo.currentProgress} />
					</div>
				</div>
			);
		}

		return null;
	}

	return (
		<div className="flex flex-col container scale-90 content-center h-screen mb-10 max-w-[52rem]">
			{torrentInfo.currentProgress > 0 && (
				<Card className="bg-black scale-100 pb-10 shadow-xl shadow-black">
					<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
						<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
							<CardTitle>
								Download Stats <span className="text-xs">{"(Mbps)"}</span>
							</CardTitle>
							<CardDescription>
								Downloading: {`${torrentInfo.game}` || "None"}
							</CardDescription>
						</div>
						<div>
							{["downloadSpeed", "diskUsage"].map((key) => {
								const chart = key as keyof typeof chartConfig;
								return (
									<button
										type="button"
										key={chart}
										data-active={activeChart === chart}
										className="relative z-30 justify-center border-t px-6 py-4
					text-left even:border-l data-[active=true]:bg-muted/15
					sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
										onClick={() => setActiveChart(chart)}
									>
										<div className="flex flex-col">
											<span className="text-xs text-muted-foreground text-white mb-1">
												{chartConfig[chart].label}
											</span>
											<span className="text-lg font-bold leading-none sm:text-3xl">
												{total[key as keyof typeof total]}
											</span>
										</div>
									</button>
								);
							})}
						</div>
					</CardHeader>
					<CardContent className="px-2 sm:p-6">
						<ChartContainer
							config={chartConfig}
							className="aspect-auto h-[250px] w-full"
						>
							<BarChart
								accessibilityLayer
								data={chartData}
								margin={{
									left: 15,
									right: 15,
									top: 40,
								}}
							>
								<CartesianGrid vertical={false} />
								<YAxis capHeight={100} />
								<Bar dataKey={activeChart} fill={"#ef4444"} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			)}

			<div className="flex flex-col gap-4 mt-10">
				<h1 className="text-2xl">Downloading</h1>
				<div
					className="size-24 w-full h-full flex flex-col border 
	border-white bg-zinc-950 rounded-xl gap-2 p-5 pb-10 shadow-xl shadow-black"
				>
					<GameContainer />
				</div>

				<QueueGameContainer />
			</div>
		</div>
	);
}

interface timeRemainingProps {
	timeRemaining: number;
}
function DownloadTimeRemaining({ timeRemaining }: timeRemainingProps) {
	return timeRemaining >= 2
		? `${timeRemaining.toFixed(0)} Minutes`
		: `${(timeRemaining * 100).toFixed(0)} Seconds`;
}

function ResumePauseTorrent({
	isPaused,
	torrentURI,
	// setIsDownloadBlocked,
	// isDownloadBlocked,
	className,
}): JSX.Element {
	if (isPaused) {
		return (
			<Button
				className={className}
				onClick={() => {
					window.api.resumeTorrent(torrentURI);
					// setIsDownloadBlocked(true);
				}}
				// {...(isDownloadBlocked ? { disabled: true } : null )}
			>
				Resume
			</Button>
		);
	}

	return (
		<Button
			className={className}
			onClick={() => {
				window.api.pauseTorrent();
				// setIsDownloadBlocked(true);
			}}
			// {...(isDownloadBlocked ? { disabled: true } : null )}
		>
			Pause
		</Button>
	);
}
