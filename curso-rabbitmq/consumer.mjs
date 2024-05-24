import amqp from 'amqplib';

async function main(){
    const connection = await amqp.connect({
        hostname: '127.0.0.1',
        port:5672,
        username:'norton',
        password:'curso'                      
    })
       
   const channel = await connection.createChannel();

   await channel.assertQueue('minha_fila',{
    durable:true
   })
   channel.prefetch(5)

   channel.consume('minha_fila',(data) =>
   {
    console.log(data.content.toString())
//channel.ack(data)
   });

}

main();