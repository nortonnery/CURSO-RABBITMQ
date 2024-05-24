import amqp from 'amqplib';

async function autoDelete(){
       const connection = await amqp.connect({
           hostname: '127.0.0.1',
           port:5672,
           username:'norton',
           password:'curso'                      
       });
       
    //Criando canal de comunicacao
   const channel = await connection.createChannel();

   //await channel.assertQueue('auto_delete',{
   // autoDelete: true
   //});

   //channel.publish('','auto_delete',Buffer.from(`Minha Fila auto-delete`))


   channel.consume('auto_delete',(data) =>{
    console.log(data.content.toString())
   })

  //await channel.close()
  //await connection.close()

}

autoDelete();