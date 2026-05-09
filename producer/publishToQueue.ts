import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

export async function publishToQueue(email: string, subject: string, message: string) {
    try{

        const mailExchange = "mail_exchange";
        const mailQueue = "mail_queue";

        const connection = await amqp.connect(process.env.AMQP_URL!);
        const channel = await connection.createChannel();

        
        await channel.assertExchange(mailExchange, "direct", {durable: true});
        await channel.assertQueue(mailQueue, {
            durable: true,
            arguments: {
                "x-dead-letter-exchange": "dlq_exchange",
                "x-dead-letter-routing-key": "bind_key"
            }
        });
        await channel.bindQueue(mailQueue, mailExchange, mailQueue);
      
        await channel.publish(mailExchange, mailQueue, Buffer.from(JSON.stringify({ email, subject, message })));
        
        console.log(`[x] Sent ${message}`);
        
        await channel.close();
        await connection.close();
 
    }catch(err){
        console.log(err);
    }
 
}