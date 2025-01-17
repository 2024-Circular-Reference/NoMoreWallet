import sucrase from '@rollup/plugin-sucrase';

const plugins = [
    sucrase({
        exclude: ['node_modules/**'],
        transforms: ['typescript'],
    }),
];

export default [
    {
        plugins,
        input: 'utils/reload/initReloadServer.ts',
        output: {
            file: 'utils/reload/initReloadServer.js',
        },
        external: ['ws', 'chokidar', 'timers'],
    },
    {
        plugins,
        input: 'utils/reload/injections/script.ts',
        output: {
            file: 'utils/reload/injections/script.js',
        },
    },
    {
        plugins,
        input: 'utils/reload/injections/view.ts',
        output: {
            file: 'utils/reload/injections/view.js',
        },
    },
];
