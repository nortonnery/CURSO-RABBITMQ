import amqp from 'amqplib';
import { randomUUID } from 'crypto'

// Filas
// email_notification
// sms_notification
// push_notification

// Quando houver alguma suspeita de login enviar mensagens para todos

 async function exchangeBinding(){
        const conn = await amqp.connect({
            hostname: '127.0.0.1',
            port:5672,
            username:'norton',
            password:'curso'
        })
        
     //Criando canal de comunicacao
    const channel = await conn.createChannel()


    // criar exchange
    await channel.assertExchange('notify_headers','headers')
    await channel.assertQueue('email_notification')
    await channel.assertQueue('sms_notification')
    await channel.assertQueue('push_notification')


    // Binds
    await channel.bindQueue('email_notification', 'notify_headers','',{'notification_type':'email',})
    await channel.bindQueue('sms_notification', 'notify_headers','',{'notification_type':'sms',})
    await channel.bindQueue('push_notification', 'notify_headers','',{'notification_type':'push'})

    channel.publish('notify_headers', '',Buffer.from('meu Header'), {
        headers:{
            notification_type:'email'
        }
    })    

    channel.publish('notify_headers', '',Buffer.from('meu Header'), {
        headers:{
            notification_type:'sms'
        }
    })    

    await channel.close()
    await conn.close()
 }

 exchangeBinding();