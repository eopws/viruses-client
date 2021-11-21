const path = require('path')

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@assets': resolvePath('./src/assets'),
            '@api': resolvePath('./src/api'),
            '@components': resolvePath('./src/components'),
            '@pages': resolvePath('./src/pages'),
            '@root': resolvePath('./src'),
            '@redux': resolvePath('./src/redux'),
            '@utils': resolvePath('./src/utils'),
        },

        configure: {
            target: 'electron-renderer'
        },
    },
}
