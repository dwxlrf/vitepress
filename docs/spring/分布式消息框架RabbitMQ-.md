## 1.什么是RabbitMQ

[***官网***]([Spring AMQP](https://spring.io/projects/spring-amqp/))

理解RabbitMQ前我们先认识三个概念：生产者、消费者、代理

没错，RabbitMQ就是最特殊的那个---代理，可以把RabbitMQ想象为一个拍卖员，生产者委托卖货，消费者出钱买货，而代理则作为拍卖行。当然，我们是不会抽取手续费滴，当代活雷锋。我们最大的使命是让双方都满意！

## 2.RabbitMQ运作模式

``执行运作前先绑定（Binding），就是一套规则，为整体的操作做前置准备``

看图前先介绍一下各方代表：

- Publisher：生产者
- Consumer：消费者
- Virtual host：本质为一个RabbitMQ服务器
  - Exchange：交换器。相当于服务器中的组件，用于操作数据
  - Queue：队列。存储运送的信息

![image-20241014214646779](分布式消息框架RabbitMQ-.assets/image-20241014214646779.png)

## 3.RabbitMQ的五种运行模式

1. ### 简单模式（Simple）：一个生产者，一个消费者

   最简单的消息模式，一个生产者，一个消费者和一个队列，生产者向队列里发送消息，消息者从队列中获取消息并消费

2. ### 工作队列模式（Work Queue）： 多个消费者竞争消息

3. ### 发布/订阅模式（Publish/Subscribe）：一个生产者，多个消费者

4. ### 路由模式（Routing）：根据路由键将消息转发到对应队列

5. ### 通配符模式（Topics）：使用通配符匹配路由键
