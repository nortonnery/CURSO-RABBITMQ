import amqp from 'amqplib';
import { randomUUID } from 'crypto'

// Filas
// email_notification
// sms_notification
// push_notification

// Quando houver alguma suspeita de login enviar mensagens para todos

 async function exchangeFanout(){
        const conn = await amqp.connect({
            hostname: '127.0.0.1',
            port:5672,
            username:'norton',
            password:'curso',
            vhost: 'fanout-example'     // CRIAR UM HOST VIRTUAL                 
        })
        
     //Criando canal de comunicacao
    const channel = await conn.createChannel()

// Criando Recursos se não existir
await channel.assertExchange('notifications','fanout')
await channel.assertQueue('email_notification')
await channel.assertQueue('sms_notification')
await channel.assertQueue('push_notification')

//Binds

await channel.bindQueue('email_notification', 'notifications','')
await channel.bindQueue('sms_notification', 'notifications','')
await channel.bindQueue('push_notification', 'notifications','')


channel.publish('notifications', '', Buffer.from(`Sua conta teve uma atividade suspeita - ${randomUUID()}`))
await channel.close()
await conn.close()
 }

 exchangeFanout();