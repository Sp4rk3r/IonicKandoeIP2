import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import * as $ from 'jquery';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs'
import {UserserviceProvider} from "../../providers/userservice/userservice";
import {UseridStorage} from "../../sessionStorage/userid-storage";
import {Message} from "../../model/message";
import {MessageServiceProvider} from "../../providers/message-service/message-service";
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [UseridStorage, UserserviceProvider],
})
export class ChatPage {
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';
  private stompClient;
  public user = [];
  public username: string;
  public message = [new Message('')];

  constructor(private userservice: UserserviceProvider,
              private useridStorage: UseridStorage,
              private messageService: MessageServiceProvider) {
    this.userservice.getUser(this.useridStorage.getUserId()).subscribe(
      data => {
        this.user = data;
        console.log(data);
        console.log(this.user);
        //this.userarray = data.toString();
      }
    );
    this.username = useridStorage.getUsername();

    //this.username = this.user.username;
  }

  ngOnInit() {
    this.initializeWebSocketConnection();
  }


  private initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat/2", (message) => {
        if (message.body) {
          $(".chat").append("<div class='\message\'>"+message.body+"</div>");
          console.log(message.body);
        }
      })
    })
  }

  sendMessage(message){
    let usernameMessage = this.useridStorage.getUsername() +': ' +  message ;
    let dbMessage = new Message( usernameMessage);
    this.messageService.sendMessage(dbMessage, 2, this.useridStorage.getUserId()).subscribe(data => { // ipv 2 naar sessionId
        console.log("message successfully send to database");
      },
      error => {
        console.error("Error sending message!");
        console.log(error);
        //alert("Error sending message");
      });
    this.stompClient.send('/app/send/message/2' , {}, usernameMessage); // ipv 2 -> sessionId
    $('#input').val('');
  }
}
