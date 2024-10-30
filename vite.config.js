import { resolve } from 'path'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, "dist");

export default {
    root: root,
    build: {
        outDir: outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                _bestsScores: resolve(root, '../src/assets/pages/_bestsScores.html'),
                _config: resolve(root, '../src/assets/pages/_config.html'),
                _jeu: resolve(root, '../src/assets/pages/_jeu.html'),
                _scoreFinal: resolve(root, '../src/assets/pages/_scoreFinal.html'),
            }
        }
    },
    server: {
        port: 8080
    }
}