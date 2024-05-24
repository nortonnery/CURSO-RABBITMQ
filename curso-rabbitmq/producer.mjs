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

    //Definindo a fila - criando se não existe
    await channel.assertQueue('minha_fila',{
        durable: true })

        // Enviando a mensagem
   // channel.publish('','minha_fila', Buffer.from('Minha mensagem'))

   let i=1
   for (let i=0;i<1000;i++)
   {
    //channel.sendToQueue('minha_fila', Buffer.from('Mensagem vinda do SendToQueue'))
     channel.publish('','minha_fila', Buffer.from(`Minha mensagem ${i}`))
   }
   
   await channel.close()
   await connection.close()

 }

main();