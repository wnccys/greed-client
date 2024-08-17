"use client";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
	ChartTooltip,
	ChartTooltipContent,
} from "@renderer/ShadComponents/ui/chart";
import { Progress } from "@renderer/ShadComponents/ui/progress";
import { useDownloads } from "@renderer/Hooks/downloads";
import { Button } from "@renderer/ShadComponents/ui/button";
import { useEffect, useState } from "react";

type chartData = {
	downloaded: number,
	downloadSpeed: number,
	diskUsage: number,
};

// const initialChartData = [{downloaded: 10, downloadSpeed: 240, diskUsage: 300}];

const chartConfig = {
	downloaded: {
		label: "Mbps",
	},
	downloadSpeed: {
		label: "Download Speed",
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

	const total = React.useMemo(
		() => ({
			downloadSpeed: (torrentInfo.downloadSpeed / 8).toFixed(1) || 0,
			diskUsage: 0,
		}), [torrentInfo]);

	useEffect(() => {
		console.log("New torrent Info: ", torrentInfo);
		const newData: chartData = {
			downloaded: torrentInfo.downloaded, 
			downloadSpeed: torrentInfo.downloadSpeed,
			diskUsage: torrentInfo.currentProgress,
		};
		console.log(newData);
		
		setChartData(oldChartData => {
			const updatedChartData = [...oldChartData, newData];
			if (updatedChartData.length > 40) {
				updatedChartData.shift();
			}

			return updatedChartData;
		});
	}, [torrentInfo]);

	function DownloadCard({ game }) {
		if (torrentInfo.currentProgress > 0) {
			return (
				<div className="flex items-center gap-5">
					<img src="https://placehold.co/75" alt="game-image" />
					<div className="text-sm pe-5">{game}</div>
					<div className="w-[45rem]">
						<div className="pe-4 flex">
							<div>
								{torrentInfo.currentProgress}%
							</div>
							<div className="flex ps-10 w-full justify-end">
								<p>{torrentInfo.downloaded} / {torrentInfo.totalSize} MB</p>
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
		<div className="flex flex-col container scale-90 content-center h-screen">
			<Card className="bg-black scale-100">
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

			<div className="flex flex-col gap-4 mt-10">
				<h1 className="text-2xl">Queue</h1>
				<div
					className="size-24 w-full h-full flex flex-col border 
				border-white bg-zinc-950 rounded-xl gap-2 p-5"
				>
					{torrentInfo.currentProgress > 0 && torrentInfo.timeRemaining && (
						<div className="flex h-1/2rem">
							<DownloadCard game={torrentInfo.game} />
							<div className="ms-6 flex flex-col w-full">
								<DownloadTimeRemaining
									timeRemaining={torrentInfo.timeRemaining}
								/>
								<div className="w-full">
									<p>{(torrentInfo.downloadSpeed / 8).toFixed(1)} Mbps</p>
									<ResumePauseTorrent isPaused={torrentInfo.isPaused} 
									className="mt-1 hover:bg-zinc-800 hover:-translate-y-1
									hover:duration-500 transition-all" />
								</div>
							</div>
						</div>
					)}
				</div>
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

function ResumePauseTorrent({ isPaused, className }): JSX.Element {
	if (isPaused) {
		return (
			<Button
				className={className}
				onClick={() =>
					window.api.resumeTorrent()
				}
			>
				{ "Resume" }
			</Button>
		)
	}

	return (
		<Button
			className={className}
			onClick={() =>
				window.api.pauseTorrent()		
			}
		>
			{ "Pause" }
		</Button>
	)
}