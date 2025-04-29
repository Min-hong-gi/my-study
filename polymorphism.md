# 다형성과 상속
## 다형성
다형성은 `하나의 객체를 여러 형태로 간주 할 수 있다`라는 뜻으로 Java의 모든 객체를 죄다 `Object`로 퉁칠 수 있다는 의미다.   
그리고 이런 다형성을 Java를 비롯한 여러 언어에서는 `상속`이라는 것으로 가능하게 하고 있다.   
여기 까지는 시험에도 나오고 하니 다 알고 있을 것인데, 문제는 이 다형성을 사용하는 방법이다.   

## 다형성의 사용
아래는 보통 다형성 이야기가 나오면 항상 나오는 예시다.
```java
class Car { }
class SuperCar extends Car { }
class TrashCar extends Car { }
```
뭐 이런 클래스가 있고, 여기에 기능을 추가하면
```java
class Car {
    protected String name = "Car";
    public void hello() {
        System.out.println("Hello, my name is " + this.name);
    }
 }
class SuperCar extends Car {
    public SuperCar() {
        this.name = "SuperCar";
     }
}
class TrashCar extends Car {
    public TrashCar() {
        this.name = "TrashCar";
     }
}
```
뭐 이런 식으로 해서 전부 다른 클래스지만 `Car`를 통해 각각의 기능을 제공할 수 있다.   
그럼 아래 예시를 보자

```java
class Animal {
    public void breath() { }
}
class Fish extends Animal {
    public void bark() {
        System.out.println("뻐끔 뻐끔(멍멍)");
    }
}
class Cat extends Animal {
    public void howl() {
        System.out.println("투명 고양이가 울부짖었다.");
    }
}
```
자 보면 알겠지만 저 `animal`클래스의 `breath`는 딱히 있든 없든 별 상관 없다.   
근데 상속을 통해 여러 하위 클래스를 구현했고 이러면 아래와 같은 문제가 생긴다.
```java
Animal cat = new Cat();
if(cat instanceof Cat) {
    ((Cat) cat).howl();    
} else if ...
```
자 동물들은 죄다 `Animal`아래 추상화 되어야 하는데 이러면 `if else` (`switch`)가 끝도 없이 늘어 날 것이다.   
그렇다고 여기에다 `Animal`을 확장하면
```java
class Animal {
    public void breath() { }
    public void bark() {}
    public void howl() {}
}
class Fish extends Animal {
    public void bark() {
        System.out.println("뻐끔 뻐끔(멍멍)");
    }
}
class Cat extends Animal {
    public void howl() {
        System.out.println("투명 고양이가 울부짖었다.");
    }
}
```
이제 물고기도 사슴벌래도, 플란넬 나방 유충도 모두 평등하게 울부짖을 수 있게 되었다.   

이로서 얻을 수 있는 교훈은
```
클래스를 큰 개념으로 묶는 짓은 그만두어라, 외부에서 구체적인 내용을 알아야 한다면 그건 그냥 별도의 요소여야 한다.
```

그럼 어떤때 상속을 해야 하는가?

아래 내가 실제로 사용했던 코드를 보며 알아보자
```java
class STDMessageParser {
    public static List<DataType> SLICE_INFO;
    {
        SLICE_INFO = new ArrayList<DataType>();
        SLICE_INFO.add(new DataType("", "", 10000));
    }

    public Map<String, String> parseHeader(String header) {
        ...
    }
    ...
    protected static class DataType {
        public String fieldName;
        public String korName;
        public Integer parseLength;

        public DataType(...) { ... }
    }
}
public class STDMessageMessageParser extends STDMessageParser {
    {
        SLICE_INFO = new ArrayList<DataType>();
        SLICE_INFO.add(new DataType("DATA_CD", "데이터코드", 1));
        SLICE_INFO.add(new DataType("DATA_LEN", "데이터길이", 10));
        ...
        SLICE_INFO.add(new DataType("MNMSG_INFO", "주메시지정보", 2000));
    }
}


STDMessageParser messageParser = new STDMessageMessageParser();
messageParser.parse(headerStr);
```
해당 코드에서 중요한 부분은 전부 `STDMessageParser`가 가지고 있으며 `STDMessageMessageParser`는 정보를 정의하기 위한 역할만을 할 뿐이다. 이로서 `messageParser.parse`로 문제를 처리할 수 있고, 새로운 파싱 규격이 생겨도 `SLICE_INFO`를 재정의한 `STDMessageParser`를 정의하면 될 뿐이다!

### 구현, 인터페이스와 추상 클래스
구현의 경우에는 위의 상속과는 약간 다른 부분이 있다.   
아래 예시와 함께 알아보자

```java 
class Dragon {
    public void breath() { }
}
class FireDragon extends Dragon {
    public void breath() {
        System.out.println("불의 숨결!");
    }
}
class PoisonDragon extends Dragon {
    public void breath() {
        System.out.println("독의 숨결!");
    }
}
```
해당 코드만 본다면 뭐가 문제인가 싶을 수도 있다.   
그럼 여기서, 왜 `Dragon`이 존재 하는지 설명 할 수 있는가? 아까 보았던 `Animal`의 `breath`와 같이 결국 하위 클래스가 전부 핵심 로직을 구현해야 하는 구조 일 뿐이다!   
그래도 `Dragon`이라는 공통 개념으로 코드 재사용성을 높일 수 있지 않나? 라는 생각이 들었다면 `추상화`를 사용할 시간이다.

추상화는 상속과 반대로 상세한 구현 부분을 전부 구현체에 맞기고 추상화된 부분은 저런 구현체를 한대 묶는 기능만을 가지고 있다. 아래 예시와 함께 알아보자

```java
interface MessagePrinter {
    public void print(String printMessage);
}
class FilePrinter implements MessagePrinter {
    public void print(String printMessage) {
        .txt파일에 printMessage를 출력하는 로직
    }
}
class ConsolePrinter implements MessagePrinter {
    public void print(String printMessage) {
        콘솔에 printMessage를 출력하는 로직
    }
}

MessagePrinter messagePrinter = new ConsolePrinter();
messagePrinter.print("this is message");
```
자 이렇게 하면 파일에 출력하든, 콘솔에 출력하든 상관 없이 `MessagePrinter`의 `print`를 사용할 수 있다!   
그리고 만약 나중에 실제 프린터를 통해 종이에 출력해야할 일이 생기더라도(물론 없겠지만 예시일 뿐이다.) `new ConsolePrinter();`부분만 프린터 구현채로 변경하면 될 일이다.   

### 오버라이딩과 오버로드
이걸 모르는 사람은 여기 없을 것이다. 하지만 상속에서 매우 중요한 부분 이기 때문에   
이번에도 예시와 함께 시작한다.

```java
class Mine {
    public Ore mining() {
        System.out.println("돌이다!");
        return new Stone();
    }
}
class SilverMine extends Mine {
    public Ore mining() {
        if(Math.random() < 0.4) {
            System.out.println("은이다!");
            return new Silver();
		}
        return new Stone();
    }
}
class GoldMine extends Mine {
    public Ore mining() {
        if(Math.random() < 0.1) {
            System.out.println("금이다!");
            return new Gold();
		}
        return null;
    }
}
```
자 광산에서 채굴을 하면 각 광산에서 나올만한 원석이 나온다.   
그런데 금, 은광산에서 채굴에 실패하면 `Ore`이 아니라 `null`이 나온다!   
아니 아무리 그래도 돌은 나와야하는거 아닌가? 라는 의문은 버리고 중요한 부분은 분명 `Ore`을 주기로 했는데 `null`을 던지고 있다는 것이다. 이게 왜 문제인가?   
저 `Ore`을 가공하는 부분을 만드는 사람은 `Mine`에서 던져준 `Ore`가 `null`인지 모른다!   
`Ore`을 뭔가로 만드는데 `null`이라고 `NullIngot`을(`NullPointerException`은 차치하더라도) 만들수는 없는 노릇이 아닌가! (특히나 `Mine`에서는 `null`을 반환하는 부분이 없어서 하위 구현체를 죄다 확인해야 하는 부분이 특히나 악질이다.)   
이렇게 잘못된 오버라이딩은 부모의 가정(규칙)을 깨부수는 것에서 시작된다.   
그리고 그렇게 꺠져버린 규칙은 클라이언트 코드를 망가뜨리게 된다. 부모의 의도를 따르라, 이건 육아가 아니고 자식의 자립의 최악을 결과를 낳을 뿐이다.

 - 위 처럼 `null`을 반환하고 싶으면 `Optinal`을 사용할 수 있다.
```java
class Mine {
    public Optional<Ore> mining() {
        System.out.println("돌이다!");
        return new Stone();
    }
}
```

