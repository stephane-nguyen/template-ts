interface ButtonStrategy {
  press(): void;
}

export class LightStrategy implements ButtonStrategy {
  press(): void {
    console.log("Light button pressed.");
  }
}

export class ResetStrategy implements ButtonStrategy {
  press(): void {
    console.log("Reset button pressed.");
  }
}

export class ChangeDisplayStrategy implements ButtonStrategy {
  press(): void {
    console.log("Change display button pressed.");
  }
}
