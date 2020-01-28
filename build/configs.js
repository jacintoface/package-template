const path = require('path')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const packageName = require('../package.json').name

const resolve = _path => path.resolve(__dirname, '../', _path)

const configs = {
    umdDev: {
        input: resolve('src/index.js'),
        file: resolve(`dist/${packageName}.js`),
        format: 'umd',
        env: 'development'
    },
    umdProd: {
        input: resolve('src/index.js'),
        file: resolve(`dist/${packageName}.min.js`),
        format: 'umd',
        env: 'production'
    },
    commonjs: {
        input: resolve('src/index.js'),
        file: resolve(`dist/${packageName}.common.js`),
        format: 'cjs'
    }
}

function genConfig (opts) {
    const config = {
        input: {
            input: opts.input,
            plugins: []
        },
        output: {
            file: opts.file,
            format: opts.format,
            name: 'Vuex'
        }
    }

    if (opts.env) {
        config.input.plugins.unshift(replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env)
        }));
    }

    if (opts.transpile !== false) {
        config.input.plugins.push(buble());
    }

    return config;
}

function mapValues (obj, fn) {
    const res = {};
    Object.keys(obj).forEach(key => {
        res[key] = fn(obj[key], key);
    })
    return res;
}

module.exports = mapValues(configs, genConfig)
