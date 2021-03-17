import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Message } from '../../../../server/out/dbc/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnChanges {

  @Input()
  private message: Message;

  public decId: string;
  public hexId: string;
  public name: string;

  constructor() { }

  ngOnInit(): void {
    this.hexId = this.message.id.toString(16).padStart(3, "000");
    this.decId = this.message.id.toString(10).padStart(4, "0000");
    this.name = this.message.name;
  }

  ngOnChanges(): void{
    
  }

}
