import amqp from 'amqplib';

async function main(){
       const connection = await amqp.connect({
           hostname: '127.0.0.1',
           port:5672,
           username:'norton',
           password:'curso'                      
       })
       
    //Criando canal de comunicacao
   const channel = await connection.createChannel()

   await channel.assertQueue('durable',{
    durable: true,
   });
 
   await channel.assertQueue('not_durable',{
    durable: false,
   });

   channel.publish('','durable',Buffer.from("mensagem duravel"),{persistent:true})
   channel.publish('','not-durable',Buffer.from("mensagem não duravel"))
   
   await channel.close()
   await connection.close()

}

main();