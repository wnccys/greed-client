import { resolve } from "node:path";
import { defineConfig, externalizeDepsPlugin, swcPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
<<<<<<< HEAD
	main: {
		plugins: [externalizeDepsPlugin(), swcPlugin()],
		resolve: {
			alias: {
				"@main": resolve("src/main"),
				"@preload": resolve("src/preload"),
			},
		},
	},
	preload: {
		plugins: [externalizeDepsPlugin()],
		resolve: {
			alias: {
				"@main": resolve("src/main"),
				"@preload": resolve("src/preload"),
			},
		},
	},
	renderer: {
		resolve: {
			alias: {
				"@renderer": resolve("src/renderer/src"),
			},
		},
		plugins: [react()],
	},
});
=======
  main: {
    plugins: [externalizeDepsPlugin(), swcPlugin()],
    resolve: {
      alias: {
        '@main': resolve('src/main'),
        '@preload': resolve('src/preload'),
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@main': resolve('src/main'),
        '@preload': resolve('src/preload'),
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      }
    },
    plugins: [react()]
  }
})
>>>>>>> d9f8664dafb3c6181e14192abd0ca8cacbab91c9
