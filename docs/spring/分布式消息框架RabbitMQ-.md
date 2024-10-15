# RabbitMQ

## 1、什么是RabbitMQ

[***官网***]([Spring AMQP](https://spring.io/projects/spring-amqp/))

理解RabbitMQ前我们先认识三个概念：生产者、消费者、代理

没错，RabbitMQ就是最特殊的那个---代理，可以把RabbitMQ想象为一个拍卖员，生产者委托卖货，消费者出钱买货，而代理则作为拍卖行负责双方的交易达成。

> 异步调用：
>
> 无需担心其他服务的失败而影响主服务的运行

- ### 优点

  1.耦合低，扩展功能方便

  2.性能高，不会因为调用该接口影响主业务的效率

  3.隔离性，每个队列都有自己的交换机，确保数据不会冲突

  4.支持消息持久化，即使服务器宕机重启也能保证消息可靠性

  5.不存在级联失败

- ### 缺点

  1.时效性差

## 2、RabbitMQ运作模式

``执行运作前先绑定（Binding），就是一套规则，为整体的操作做前置准备``

看图前先介绍一下各方代表：

- Publisher：生产者
- Consumer：消费者
- Virtual host：本质为一个RabbitMQ服务器
  - Exchange：交换器。相当于服务器中的组件，用于操作数据
  - Queue：队列。存储运送的信息

![image-20241014214646779](分布式消息框架RabbitMQ-.assets/image-20241014214646779.png)

## 3、RabbitMQ的五种运行模式（快速开始）

每种模式取决于不同的需求，根据需求来决定自己使用哪种运行模式。

> 前置依赖

```xml
		<!--AMQP依赖，包含RabbitMQ-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-amqp</artifactId>
        </dependency>
```

> yml文件链接配置

```yml
spring:
  rabbitmq:
    host: 192.168.138.100	# 你的虚拟机IP
    port: 5672	# 端口
    virtual-host: /hmall	# 虚拟主机，别人提供或者提前创建
    username: dwx	# 用户名
    password: 123	# 密码
```

> config1.交换机Exchange、队列Queue、绑定Binding配置

``交换机配置``

```java
	//创建一个名为fanout.Exchange的交换机
	@Bean
    public FanoutExchange fanoutExchange(){
        return new FanoutExchange("fanout.Exchange");
    }
```

``队列配置``

```java
	//创建方式1
	@Bean
    public Queue fanoutQueue1(){
        return new Queue("fanout.Queue1");
    }

	//创建方式2
    @Bean
    public Queue fanoutQueue2(){
        return QueueBuilder.durable("fanout.Queue2").build();
    }
```

``绑定配置``

```java
	//将fanout.Queue1绑定到fanout.Exchange
	@Bean
    public Binding fanoutBinding1(){
        return BindingBuilder.bind(fanoutQueue1()).to(fanoutExchange());
    }
```

> config2.注解配置交换机Exchange、队列Queue、绑定Binding

```apl
    #用在监听方法上，直接创建交换机并绑定队列
    @RabbitListener(bindings = {
            @QueueBinding(
                    value = @Queue(name = "fanout.Queue2"),
                    exchange = @Exchange(name = "fanout.Exchange",
                                         type = ExchangeTypes.FANOUT)
            )
    })
```

``操作工具类``

> 封装了RabbitTemplate工具，用于发送消息，操作前注入该工具类

### 1.简单模式（Simple）：一个生产者，一个消费者

最简单的消息模式，一个生产者，一个消费者和一个队列，生产者向队列里发送消息，消息者从队列中获取消息并消费。

``生产者``

```java
	@Test
    public void testFanoutQueue() {
        String queueName = "fanout.Queue1";
        rabbitTemplate.convertAndSend
            (queueName,User.builder().name("dwx").age(25).id(1).build());
    }
```

``消费者``

```java
	@RabbitListener(queues = "fanout.Queue1")
    public void listenSimpleQueueMessage2(Object msg) {
        System.out.println(msg);
    }
```

### 2.工作队列模式（Work Queue）： 多个消费者竞争消息

### 3.发布/订阅模式（Publish/Subscribe）：一个生产者，多个消费者

### 4.路由模式（Routing）：根据路由键将消息转发到对应队列

### 5.通配符模式（Topics）：使用通配符匹配路由键
