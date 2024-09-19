import { createDefaultPreset, type JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsconfig: {
                jsx: 'react-jsx',
                esModuleInterop: true,
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
            }
        }
    }
}

export default jestConfig;