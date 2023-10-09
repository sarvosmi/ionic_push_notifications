import { Component ,OnInit} from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

    constructor() {}

    ngOnInit() {
      this.addListeners();
    }

    addListeners = async () => {
      await PushNotifications.addListener('registration', token => {
        alert('Registration token: '+ token.value);
      });
    
      await PushNotifications.addListener('registrationError', err => {
        alert('Registration error: '+ err.error);
      });
    
      await PushNotifications.addListener('pushNotificationReceived', notification => {
        alert('Push notification received: '+ JSON.stringify(notification));
      });
    
      await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        alert('Push notification action performed'+ notification.actionId+ notification.inputValue);
      });
    }
    
    async registerPushNotifications()
    {
      
      try{
        let permStatus = await PushNotifications.checkPermissions();      
          alert(JSON.stringify(permStatus))
          if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
          }  
            
          if (permStatus.receive !== 'granted') {
            alert('User denied permissions!');
          }
          if(permStatus.receive==='granted')
          {
            try{  
              await PushNotifications.register();
            }
            catch(e){alert(JSON.stringify(e));}
          }
      }
      catch(e:any){alert(JSON.stringify(e));}
    
     
    }

    getDeliveredNotifications = async () => {
      const notificationList = await PushNotifications.getDeliveredNotifications();
      alert('delivered notifications' + JSON.stringify(notificationList));
    }
}
