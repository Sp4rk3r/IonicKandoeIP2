import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
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
  queries: {
    content: new ViewChild('content')
  }
})
export class ChatPage {
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';
  private stompClient;
  public user = [];
  public username: string;
  public message = [new Message('')];
  public sessionId;
  private stringBody: string;
  private stringDiv: string;
  private timestamp: string;
  private timesubstring: string;

//  public stringBody;

  constructor(private userservice: UserserviceProvider,
              private useridStorage: UseridStorage,
              private messageService: MessageServiceProvider,
              public navParams: NavParams) {
    this.userservice.getUser(this.useridStorage.getUserId()).subscribe(
      data => {
        this.user = data;
        console.log(data);
        console.log(this.user);
        //this.userarray = data.toString();
      }
    );
    this.messageService.getMessages(this.sessionId,this.useridStorage.getUserId()).subscribe(
      data => {
        this.message = data;
      }
    );
    this.username = useridStorage.getUsername();
    this.sessionId = this.navParams.get("sessionIdParam");
    //alert(this.sessionId)
    //this.username = this.user.username;
  }

  ngOnInit() {
    this.initializeWebSocketConnection(this.sessionId, this.username);
    this.messageService.getMessages(this.sessionId,this.useridStorage.getUserId()).subscribe(
      data => {
        this.message = data;
      }
    );
  }


  private initializeWebSocketConnection(sessionId: number, username: string) {
    let ws = new SockJS(this.serverUrl);
    this.stringBody= "";
    this.stringDiv = "";
    this.timestamp = "";
    this.timesubstring = "";
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      //alert(sessionId);
      that.stompClient.subscribe("/chat/" + sessionId , (message) => {
        //alert(message.contains(username));
        //if (message.body) {
          this.stringBody = message.body;
          //this.timestamp = this.stringBody.substring(0,10);
          //alert(this.timestamp);
          //alert(this.stringBody);
          if (this.stringBody.includes(username)){
            //alert("bevat: " + username);
            //this.stringBody.substring(10);
            //alert(this.stringBody);
            alert("username");
            //this.stringDiv = "<div class='\messageContains\'>"+this.stringBody+"</div>";
            $(".chat2").append("<div class='\messageContains\'>"+this.stringBody+"</div>");
            //this.timesubstring = "<div class='\timeStamp\'>"+this.timestamp+"</div>";
          }else {
            alert("Not username");
            //this.stringDiv = "<div class='\notUserContains\'>"+this.stringBody+"</div>";
            $(".chat2").append("<div class='\notUserContains\' style='\position: relative; float: left; background: white; width: 60%; margin: 2vw; text-align: left; border-radius: 10px; padding: 5px\'>"+this.stringBody+"</div>");
            //ngOnInit();

          }
          //alert(this.stringDiv);
         // $(".chat").append(this.stringDiv);
          //$(".chat").append(this.timesubstring);

          console.log(message.body);
          //alert(username)
        }/*else {
          $(".chat").append("<div class='\notUserContains\'>"+message.body+330+"</div>");
        }*/
      //}
      )
    })
  }

  sendMessage(message){
    let usernameMessage = this.useridStorage.getUsername() +': ' +  message ;
    let dbMessage = new Message( usernameMessage);
    this.messageService.sendMessage(dbMessage, this.sessionId, this.useridStorage.getUserId()).subscribe(data => { // ipv 2 naar sessionId
        console.log("message successfully send to database");
      },
      error => {
        console.error("Error sending message!");
        console.log(error);
        //alert("Error sending message");
      });
    this.stompClient.send('/app/send/message/' + this.sessionId , {}, usernameMessage); // ipv 2 -> sessionId
    $('#input').val('');
  }
}
