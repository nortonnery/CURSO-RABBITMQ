import amqp from 'amqplib';

async function maxPriority(){
       const connection = await amqp.connect({
           hostname: '127.0.0.1',
           port:5672,
           username:'norton',
           password:'curso'                      
       })
       
    //Criando canal de comunicacao
   const channel = await connection.createChannel()

   await channel.assertQueue('priority',{
    maxPriority:5
   })

  /*  for (let i=0; i<10; i++) {
    channel.publish('','priority',Buffer.from('mensagem padrão sem prioridade'))
   } */
   channel.publish('','priority',Buffer.from('mensagem com prioridade 3'),{
    priority:3
   })

  await channel.close()
  await connection.close()

}

maxPriority();