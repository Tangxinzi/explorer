const a = {
    "name": "react-project",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "@babel/core": "7.4.3",
        "@svgr/webpack": "4.1.0",
        "@typescript-eslint/eslint-plugin": "1.6.0",
        "@typescript-eslint/parser": "1.6.0",
        "antd": "^3.19.8",
        "axios": "^0.19.0",
        "babel-eslint": "10.0.1",
        "babel-jest": "^24.8.0",
        "babel-loader": "8.0.5",
        "babel-plugin-import": "^1.12.0",
        "babel-plugin-named-asset-import": "^0.3.2",
        "babel-preset-react-app": "^9.0.0",
        // "camelcase": "^5.2.0",
        "case-sensitive-paths-webpack-plugin": "2.2.0",
        "css-loader": "2.1.1",
        // "customize-cra": "^0.2.14",
        "dotenv": "6.2.0",
        "dotenv-expand": "4.2.0",
        "eslint": "^5.16.0",
        "eslint-config-react-app": "^4.0.1",
        "eslint-loader": "2.1.2",
        "eslint-plugin-flowtype": "2.50.1",
        "eslint-plugin-import": "2.16.0",
        "eslint-plugin-jsx-a11y": "6.2.1",
        "eslint-plugin-react": "7.12.4",
        "eslint-plugin-react-hooks": "^1.5.0",
        "ethers": "^4.0.33",
        "file-loader": "3.0.1",
        "fs-extra": "7.0.1",
        "html-webpack-plugin": "4.0.0-beta.5",
        "http-proxy-middleware": "^0.19.1",
        "identity-obj-proxy": "3.0.0",
        "is-wsl": "^1.1.0",
        "jest": "24.7.1",
        "jest-environment-jsdom-fourteen": "0.1.0",
        "jest-resolve": "24.7.1",
        "jest-watch-typeahead": "0.3.0",
        // "mini-css-extract-plugin": "0.5.0",
        "optimize-css-assets-webpack-plugin": "5.0.1",
        "pnp-webpack-plugin": "1.2.1",
        "postcss-flexbugs-fixes": "4.1.0",
        "postcss-loader": "3.0.0",
        "postcss-normalize": "7.0.1",
        "postcss-preset-env": "6.6.0",
        "postcss-safe-parser": "4.0.1",
        "react": "^16.8.6",
        "react-app-polyfill": "^1.0.1",
        // "react-app-rewired": "^2.1.3",
        "react-dev-utils": "^9.0.1",
        "react-dom": "^16.8.6",
        "react-redux": "^7.1.0",
        "react-router": "^5.0.1",
        // "react-scripts": "^3.0.1",
        "redux": "^4.0.4",
        "resolve": "1.10.0",
        "sass-loader": "7.1.0",
        "scripts": "^0.1.0",
        "semver": "6.0.0",
        "style-loader": "0.23.1",
        "terser-webpack-plugin": "1.2.3",
        "ts-pnp": "1.1.2",
        "url-loader": "1.1.2",
        "webpack": "4.29.6",
        "webpack-dev-server": "3.2.1",
        "webpack-manifest-plugin": "2.0.4",
        "workbox-webpack-plugin": "4.2.0"
    },
    "scripts": {
        "start": "react-app-rewired start",
        "build": "react-app-rewired build",
        "test": "react-app-rewired test"
    },
    "eslintConfig": {
        "extends": "react-app"
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    },
    // "devDependencies": {
    //   "@babel/core": "7.1.0",
    //   "@babel/plugin-proposal-class-properties": "^7.1.0",
    //   "@babel/plugin-proposal-decorators": "^7.1.0",
    //   "@babel/preset-env": "^7.1.0",
    //   "bizcharts": "^3.5.4",
    //   "react-ace": "^7.0.2",
    //   "react-router-dom": "^5.0.1"
    // },
    "proxy": "http://47.94.150.170:8080",
    "jest": {
        "collectCoverageFrom": [
            "src/**/*.{js,jsx,ts,tsx}",
            "!src/**/*.d.ts"
        ],
        "setupFiles": [
            "react-app-polyfill/jsdom"
        ],
        "setupFilesAfterEnv": [],
        "testMatch": [
            "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
            "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
        ],
        "testEnvironment": "jest-environment-jsdom-fourteen",
        "transform": {
            "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
            "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
            "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
        },
        "transformIgnorePatterns": [
            "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
            "^.+\\.module\\.(css|sass|scss)$"
        ],
        "modulePaths": [],
        "moduleNameMapper": {
            "^react-native$": "react-native-web",
            "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
        },
        "moduleFileExtensions": [
            "web.js",
            "js",
            "web.ts",
            "ts",
            "web.tsx",
            "tsx",
            "json",
            "web.jsx",
            "jsx",
            "node"
        ],
        "watchPlugins": [
            "jest-watch-typeahead/filename",
            "jest-watch-typeahead/testname"
        ]
    },
    "babel": {
        "presets": [
            "react-app"
        ],
        "plugins": [
            [
                "@babel/plugin-proposal-decorators",
                {
                    "legacy": true
                }
            ]
        ]
    }
}