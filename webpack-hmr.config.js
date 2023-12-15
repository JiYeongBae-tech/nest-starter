const nodeExternels = require("webpack-node-externals");
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (optoins , webpack){
    return{
        ...optoins,
        entry: ['webpack/hot/poll?100' , optoins.entry],
        externals: [
            nodeExternels({
                allowlist : ['webpack/hot/poll?100'],
            })
        ],
        plugins: [
            ...optoins.plugins,
            new webpack.HotModuleReplacementPlugin({
                paths: [  /\.js$/ , /\.d\.ts$/]
            }),
            new RunScriptWebpackPlugin({name: optoins.output.filename , autoRestart : false})
        ]
    }
}