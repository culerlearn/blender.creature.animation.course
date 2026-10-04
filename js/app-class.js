
import * as THREE from 'three';
import { ModelLoader } from './modelloader.js';
import { AnimationController } from './player/animation-controller.js';
import { CharacterController } from './player/character-controller.js';
import { DistanceTracker } from './tracking/distance-tracker.js';
import { DistanceHUD } from './ui-items/distance-hud.js';
import { OnScreenControls } from './ui-items/on-screen-controls.js';

import { EnvironmentManager } from './environment/environment-manager.js';

import { SceneManager } from './scene-manager.js';
import { ScoreManager } from './player/score-manager.js';
import { RunTimer } from './tracking/run-timer.js';
import { RaceManager } from './environment/race-manager.js';

import { ResultBanner } from './ui-items/result-banner.js';
import { RestartModal } from './ui-items/restart-modal.js';
import { CameraFollow } from './player/camera-follow.js';

import { TopHUD } from './ui-items/top-hud.js';

import { Timer } from 'three';

const CONTROLS_SELECTOR = '.on-screen-controls';
const DEAD_ZONE = 0.1; // fraction of the window width, either side of centre

class App
{
    constructor()
    {
        this.sceneManager = new SceneManager(document.body);
        this.environmentManager = new EnvironmentManager(this.sceneManager.scene, this.sceneManager.sunLight);
        
        this.scoreManager = new ScoreManager();
        this.resultBanner = new ResultBanner();

        this.timer = new Timer();

        // model-dependent objects
        this.animationController = null;
        this.characterController = null;
        this.distanceTracker = null;
        this.onScreenControls = null;
        this._mouseHeld = false;

        this.topHUD = new TopHUD();
        this.resultBanner = new ResultBanner();
        
        this.restartModal = new RestartModal({
            onRestart: () => this.restartRun(),
            onToggleOrbit: (enabled) => this.sceneManager.setOrbitControlsEnabled(enabled),
            onExit: () => this.exitGame(),
        });
        
        this._bindInput();

        this.animate();

    }

    handleKeyDown(e) {
        if(!this.characterController) return;

        if (e.key === 'ArrowUp') this.characterController.moveForward(true);
        if (e.key === 'ArrowLeft') this.characterController.turn(1);
        if (e.key === 'ArrowRight') this.characterController.turn(-1);
    }

    handleKeyUp(e) {
        if(!this.characterController) return;
        
        if (e.key === 'ArrowUp') this.characterController.moveForward(false);
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') this.characterController.turn(0);
    }

    _fromControls(e){
        return e.target.closest?.(CONTROLS_SELECTOR) != null;
    }

    _steer(e){
        const offset = (e.clientX - window.innerWidth / 2) / window.innerWidth;

        if(offset < -DEAD_ZONE){
            this.characterController.turn(1);
        }
        else if(offset > DEAD_ZONE){
            this.characterController.turn(-1);
        } else{
            this.characterController.turn(0);
        }
    }

    _stopInput = () => {
        this._mouseHeld = false;

        if(!this.characterController) return;
        this.characterController.moveForward(false);
        this.characterController.turn(0);
    }

    handleMouseDown(e){
        if(!this.characterController || this._fromControls(e)) return;
        this._mouseHeld = true;
        this.characterController.moveForward(true);
        this._steer(e);
    }

    handleMouseMove(e){
        if(!this._mouseHeld || !this.characterController) return;

        this._steer(e);
    }

    hanldeMouseUp(e){
        if(this._mouseHeld) this._stopInput();
    }

    handlBlur(e){
        this._stopInput();
    }

    _bindInput(){
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));

        window.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('mouseup', (e) => this.hanldeMouseUp(e));
        window.addEventListener('blur', (e) => this.handlBlur(e));
    }

    exitGame(){
        document.body.innerHTML = '<div style="color:#fff;font-family:Arial,sans-serif;text-align:center;margin-top:40vh;font-size:24px;">';
        document.body.innerHTML += 'Thanks for playing.';
        document.body.innerHTML += '</div>';
    }

    async init(){

        await this.environmentManager.init(
            [
                '/model/buildings/building-1.glb',
                '/model/buildings/building-2.glb',
                '/model/buildings/building-3.glb',
                '/model/buildings/building-4.glb',
            ],
            10,
            [
                '/model/rocks/rock-1.glb',
                '/model/rocks/rock-2.glb',
                '/model/rocks/rock-3.glb',
                '/model/rocks/rock-4.glb',
            ],
            12
        );
        
        const modelLoader = new ModelLoader();
        modelLoader.load('/model/animated-crab.glb').then((gltf) => {
            const model = gltf.scene;

            model.scale.set(0.25, 0.25, 0.25);

            gltf.animations.forEach((clip) => {
                console.log(`Clip: ${clip.name}`);
                // clip.tracks.forEach((track) => console.log(`  Track: ${track.name}`));
            });

            this.sceneManager.scene.add(model);

            this.animationController = new AnimationController(model, gltf.animations);

            this.distanceTracker = new DistanceTracker(model);

            this.characterController = new CharacterController(model, this.animationController, this.environmentManager.layoutManager);
            this.onScreenControls = new OnScreenControls(this.characterController);

            this.runTimer = new RunTimer();
            this.raceManager = new RaceManager(model, this.environmentManager.layoutManager, this.runTimer);
            this.raceManager.start();

            this.cameraFollow = new CameraFollow(this.sceneManager.camera, model);
        
        });



    }

    animate = () => {
    
        requestAnimationFrame(this.animate);

        this.timer.update();
        const delta = this.timer.getDelta();

        if (this.animationController) {
            this.animationController.update(delta);
        }

        if (this.characterController) {
            this.characterController.update(delta);
        }
        if(this.distanceTracker){
            this.distanceTracker.update();
            this.topHUD.updateDistance(this.distanceTracker.getDistance());
        }

        if(this.runTimer){
            this.topHUD.updateTime(this.runTimer.getElapsedSeconds());
        }

        if(this.scoreManager){
            this.topHUD.updateBest(this.scoreManager.getPersonalBest());
        }

        if(this.uiManager){
            this.uiManager.update();
        }

        if (this.raceManager) {
            this.raceManager.update();

            if (this.raceManager.hasFinished && !this.raceFinishHandled) {
                this.raceFinishHandled = true;
                const result = this.scoreManager.submitRun(this.runTimer.getElapsedSeconds());

                this.sceneManager.setOrbitTarget(this.characterController.model.position);
                
                this.resultBanner.show(result);
                this.restartModal.showAfterDelay(5);
            }
        }

        // Game is in 3rd person so we want to follow the character with the camera, but only if the race is still ongoing
        if(this.cameraFollow && this.raceManager && !this.raceManager.hasFinished){

            this.cameraFollow.update(delta);
            this.sceneManager.setOrbitControlsEnabled(false);
        } else{
            this.sceneManager.setOrbitControlsEnabled(true);
        }

        this.sceneManager.render();
    };

    restartRun(){
        this.resultBanner.hide();
        this.restartModal.hide();

        const start = this.environmentManager.layoutManager.getStartPoint();
        this.characterController.model.position.set(start.x, 0, start.z);
        this.characterController.model.rotation.y = 0;

        this.distanceTracker.reset();
        this.runTimer.reset();

        this.environmentManager.obstacleManager.placeObstacles(12);

        this.raceFinishHandled = false;
        this.raceManager.start();
    }
}

export { App };