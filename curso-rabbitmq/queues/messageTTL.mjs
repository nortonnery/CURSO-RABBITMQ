import amqp from 'amqplib';

async function messageTtl(){
       const connection = await amqp.connect({
           hostname: '127.0.0.1',
           port:5672,
           username:'norton',
           password:'curso'                      
       });
       
    //Criando canal de comunicacao
   const channel = await connection.createChannel();

   await channel.assertQueue('message_TTL',{
    messageTtl: 30000
   });

   channel.publish('','message_TTL',Buffer.from(`Minha mensagem de 30s`))

  //await channel.close()
  //await connection.close()

}

messageTtl();