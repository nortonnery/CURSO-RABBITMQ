import amqp from 'amqplib';

 async function exchange(){
        const conn = await amqp.connect({
            hostname: '127.0.0.1',
            port:5672,
            username:'norton',
            password:'curso'                      
        })
        
     //Criando canal de comunicacao
    const channel = await conn.createChannel()

    //criar uma exchange
    await channel.assertExchange('udemy_exchange', 'direct')

    //criar uma fila
    await channel.assertQueue("udemy_push_notification",{
        durable:true,
    })

    //criar uma fila
    await channel.assertQueue("udemy_email_notification",{
        durable:true,
    })

    //Binding - linkar fila com Exchange
    await channel.bindQueue('udemy_push_notification', 'udemy_exchange', 'novoCurso')
    await channel.bindQueue('udemy_email_notification', 'udemy_exchange', 'novoCurso')
    await channel.bindQueue('udemy_email_notification', 'udemy_exchange', 'diploma')

    //Publicando mensagem com chave de roteamento
    channel.publish(
        "udemy_exchange",
        "diploma",
        Buffer.from("Teste Mensagem")
    );
 }

 exchange();