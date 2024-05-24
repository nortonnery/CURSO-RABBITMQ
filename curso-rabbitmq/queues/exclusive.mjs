import amqp from 'amqplib';
import { randomUUID } from 'crypto'
import { setTimeout } from 'timers/promises';

async function exclusive(){
       const connection = await amqp.connect({
           hostname: '127.0.0.1',
           port:5672,
           username:'norton',
           password:'curso'                      
       })
       
    //Criando canal de comunicacao
   const channel = await connection.createChannel()

   await channel.assertQueue('exclusive',{
    exclusive:true
   })

   //consumindo mensagens da fila
   channel.prefetch(3)
   channel.consume("exclusive", (data) => {
    console.log(data.content.toString());
    setTimeout(() => {
      channel.ack(data)
    },1000)
   })

   for (let i=0; i<10; i++) {
    channel.publish('',
    'exclusive',
    Buffer.from(`mensagem exclusiva = ${randomUUID()}`))
   } 

  //await channel.close()
  //await connection.close()

}

exclusive();