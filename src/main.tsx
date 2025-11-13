import './index.css';
import {createRoot} from "react-dom/client";
import {retrieveLaunchParams} from "@telegram-apps/sdk-react";
import App from "./App.tsx";
import {StrictMode} from "react";
import {init} from "./init.ts";

// mock the environment
import './mockEnv.ts';

const root = createRoot(document.getElementById('root')!);

try {
    const launchParams = retrieveLaunchParams();
    const {tgWebAppPlatform: platform} = launchParams;
    const debug = (launchParams.tgWebAppStartParam || '').includes('platformer_debug')
        || import.meta.env.DEV;
    await init({
        debug,
        mockForMacOS: platform === 'macos',
    })
        .then(() => {
            root.render(
                <StrictMode>
                    <App/>
                </StrictMode>,
            );
        });
} catch (e){
    console.error(e);
    root.render(<h1>Env unsupported</h1>);
}