import amqp from 'amqplib';

 async function exchangeTopic(){
        const conn = await amqp.connect({
            hostname: '127.0.0.1',
            port:5672,
            username:'norton',
            password:'curso'                      
        })
        
     //Criando canal de comunicacao
    const channel = await conn.createChannel()

   //criar uma exchange
   //ERRO GERADO DEVIDO AO TIPO 'TOPIC'
   await channel.assertExchange('system_exchange', 'topic')
   await channel.assertQueue('system_logs')

   await channel.bindQueue('system_logs','system_exchange','logs.#')

   channel.publish('system_exchange','logs.system.info', Buffer.from('sistema iniciado'))
   channel.publish('system_exchange','logs.system.erro', Buffer.from('Erro no Sistema'))

    await channel.close()
    await conn.close()
 }

 exchangeTopic();