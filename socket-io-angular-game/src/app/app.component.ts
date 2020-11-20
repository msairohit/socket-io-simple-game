import { Component, ViewChild, ElementRef } from '@angular/core';
import * as io from 'socket.io-client/dist/socket.io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socket-io-angular-game';

  // socket = io("http://localhost:3000");
  
  // https://www.youtube.com/watch?v=SZcY8cB8nhQ

  @ViewChild("game")
  private gameCanvas: ElementRef;

  private context: any;

  private socket: any;

  ngOnInit(): void {

    this.socket = io("http://localhost:3000");
  }

  public ngAfterViewInit() {
    this.context = this.gameCanvas.nativeElement.getContext("2d");
    this.socket.on("position", position => {
      this.context.clearRect(
        0,
        0,
        this.gameCanvas.nativeElement.width,
        this.gameCanvas.nativeElement.height,
      )
      this.context.fillRect(position.x, position.y, 20, 20);
    });
  }

  public move(direction: string) {
    this.socket.emit("move", direction)
  }

}
