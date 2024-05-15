import { randomPoint } from ".";
import { ModeButton, IncreaseButton, Button } from "./Button/Button";
import { ButtonState, NothingState } from "./Button/ButtonState";
import { LightStrategy, ChangeTimeFormatStrategy, AnimateStrategy } from "./Button/ButtonStrategy";
import { Matrix3x3, Vector2D } from "./Geometry";
import { Time } from "./Time/Time";

export class Watch {
  private state: ButtonState;

  private modeButton: ModeButton;
  private increaseButton: IncreaseButton;
  private lightButton: Button;
  private resetButton: Button;
  private changeTimeFormatButton: Button;
  private animateButton: Button;

  private watchContainer: HTMLDivElement;
  private timeSpan: HTMLSpanElement;

  private intervalId: NodeJS.Timeout;

  private time: Time;

  private originalPosition: Vector2D;
  private position: Vector2D;

  private rotationAngle: number;
  private scaleFactor: number;

  constructor(timezone: string) {
    this.watchContainer = document.createElement("div");
    this.timeSpan = document.createElement("span");
    this.watchContainer.appendChild(this.timeSpan);
    document.body.appendChild(this.watchContainer);

    // declare in Watch rather than mode button to rather share state with increaseButton
    this.state = new NothingState();

    this.time = new Time(timezone);

    this.modeButton = new ModeButton(this.watchContainer, this, this.time);
    this.increaseButton = new IncreaseButton(this.watchContainer, this, this.time);
    this.lightButton = new Button(this.watchContainer, "Light", new LightStrategy(this.timeSpan));
    this.changeTimeFormatButton = new Button(
      this.watchContainer,
      "Change time format",
      new ChangeTimeFormatStrategy(this.time)
    );

    this.animateButton = new Button(this.watchContainer, "Animate", new AnimateStrategy(this));

    this.intervalId = setInterval(() => this.updateTimeText(), this.time.oneSecond());
    this.position = new Vector2D(
      this.watchContainer.offsetWidth / 2,
      this.watchContainer.offsetHeight / 2
    );

    this.originalPosition = this.position;

    this.rotationAngle = 0;
    this.scaleFactor = 1;
  }

  private updateTimeText(): void {
    this.time.tick();
    this.timeSpan.textContent = this.time.toString();
  }

  public getState(): ButtonState {
    return this.state;
  }

  public setState(state: ButtonState) {
    this.state = state;
  }

  public animate(): void {
    setInterval(() => {
      this.scale();
      this.rotate();
    }, 500);
  }

  public scale(): void {
    const scaleUpLimit = this.originalPosition.getY() + 30; // 30 is arbitrary
    console.log(this.originalPosition.getY());
    if (this.position.getY() <= scaleUpLimit) {
      this.scaleUp();
      console.log(this.position.getY());
    } else {
      this.scaleDown();
    }

    // 0 since we want to scale vertically
    const scalingMatrix = Matrix3x3.scaling(0, this.scaleFactor);

    this.position = scalingMatrix.transformPoint(this.position);

    this.watchContainer.style.transform = `translate(${this.position.getX()}px, ${this.position.getY()}px)`;
  }

  public scaleUp(): void {
    const TEN_POURCENT_OF_SCALE_FACTOR = 0.1;
    this.setScaleFactor(this.scaleFactor + TEN_POURCENT_OF_SCALE_FACTOR);
  }

  public scaleDown(): void {
    const TEN_POURCENT_OF_SCALE_FACTOR = 0.1;
    this.setScaleFactor(this.scaleFactor - TEN_POURCENT_OF_SCALE_FACTOR);
  }

  public rotate(): void {
    const twenty_degree = 20;
    this.setRotationAngle(this.rotationAngle + twenty_degree);

    let rotationMatrix;
    if (randomPoint.getX() < 50 && randomPoint.getY() < 50) {
      rotationMatrix = Matrix3x3.rotateAroundPoint(this.rotationAngle, randomPoint);
    } else {
      rotationMatrix = Matrix3x3.rotateAroundPoint(this.rotationAngle, this.position);
    }

    const transformedPosition = rotationMatrix.transformPoint(this.position);
    this.watchContainer.style.transform = `translate(${transformedPosition.getX()}px, ${transformedPosition.getY()}px) rotate(${
      this.rotationAngle
    }deg)`;
  }

  getPosition(): Vector2D {
    return this.position;
  }
  setPosition(value: Vector2D) {
    this.position = value;
  }

  getRotationAngle(): number {
    return this.rotationAngle;
  }
  setRotationAngle(value: number) {
    this.rotationAngle = value;
  }

  getScaleFactor(): number {
    return this.scaleFactor;
  }
  setScaleFactor(value: number) {
    this.scaleFactor = value;
  }
}
