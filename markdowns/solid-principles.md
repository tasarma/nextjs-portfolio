---
published: '2024-06-24'
edited: '2024-06-24'
link: 'posts/solid-principles'
headings: ["Single Responsibility Principle","Open Closed Principle","Liskov Substitution Principle","Interface Segregation Principle","Dependency Inversion Principle","Resources"]
title: "Demystifying SOLID Principles in OOP"
description: "A comprehensive guide to understanding the SOLID principles."
categories: ["Programming", "OOP", "SOLID"]
---

## Introduction

The goal of this article is to demystify SOLID, which outlines five design principles in object-oriented programming (OOP). We will begin by discussing what SOLID encompasses.

Design principles serve as high-level design guidelines for developed applications. However, they do not provide guidance on the specific methods and techniques for their implementation.

The goal of SOLID principles is to provide a foundation for building robust, maintainable, and scalable software. They guide developers in creating systems that are easier to understand, test, and extend, ultimately leading to higher-quality software that can adapt to changing requirements.

## SOLID Principles

- S — SRP — Single Responsibility Principle
- O — OCP — Open Closed Principle
- L — LSP — Liskov Substitution Principle
- I — ISP — Interface Segregation Principle
- D — DIP — Dependency Inversion Principle

### Single Responsibility Principle (SRP)

Each class should have only a reason to change. Each class should be responsible for a single, well-defined task. Also, everything within the class should be linked to the task.

We can apply this principle not only to classes, but also to broader context such as modules, microservices, and so forht. The classes, modules, and microservices with a single responsibility are easier to code, less fragile, readable, and easier to manage compared to those that serve multiple purposes. This has the benefit of increasing the speed of development while reducing the number of bugs.

Let me try to explain with a brief example before we delve into the code snippet. Let’s define a class to hold personnel information. When there is a change in the calculation of personnel salary, the class will also require modification to reflect that change. Besides, if the class needs to be changed when there is a change in the database personnel schema, then we have at least two reasons for the class to modify. Basically what is wanted is to avoid situations that will require multiple changes in the class.

This code snippet is an example of violating SRP. The `FileManager` class has two distinct responsibilities: reading and writing from a file, and compressing and decompressing a file.

#### Violating SRP

```python
class FileManager:
    def __init__(self, filename):
        self.path = filename

    def read(self, encoding="utf-8"):
        pass

    def write(self, data, encoding="utf-8"):
        pass

    def compress(self):
        pass

    def decompress(self):
        pass
```
The next code snippet demonstrates a good example of SRP by separating the `FileManager` class into dedicated classes for reading/writing and compression/decompression.

#### Following SRP
```python
class FileManager:
    def __init__(self, filename):
        self.path = filename

    def read(self, encoding="utf-8"):
        pass

    def write(self, data, encoding="utf-8"):
        pass

class ZipFileManager:
    def __init__(self, filename):
        self.path = filename

    def compress(self):
        pass

    def decompress(self):
        pass
```

### Open Closed Principle (OCP)

The aim of this principle is to extend the features offered by a class or a module without altering the base code. Basically, classes, modules etc. should be open for extension and close for modification.

Therefore, we should focus on writing codes that do not require rewriting or modification when requirements change. Not altering the existing code, in other words, refraining from intervening in the code that has been previously written and proven to work successfully , reduces the likelihood of encountering errors and potential problems.

Examples of OCP include tools like Visual Studio Code, most IDEs and Notepad. It is possible to add and use a wide variety plugins to these applications without reinstalling the applications themselves. In this types of plugins architectures, plugins can be added and used without the need to modify the code architecture of the application. This is a good example of a use case that is open to extension and does not require modification of pre-written code.

#### Violating OCP

```python
from math import pi

class Shape:
    def __init__(self, shape_type, **kwargs):
        self.shape_type = shape_type
        if self.shape_type == "rectangle":
            self.width = kwargs["width"]
            self.height = kwargs["height"]
        elif self.shape_type == "circle":
            self.radius = kwargs["radius"]

    def calculate_area(self):
        if self.shape_type == "rectangle":
            return self.width * self.height
        elif self.shape_type == "circle":
            return pi * self.radius**2
```

#### Following OCP

```python
from abc import ABC, abstractmethod
from math import pi

class Shape(ABC):
    @abstractmethod
    def calculate_area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def calculate_area(self):
        return pi * self.radius**2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def calculate_area(self):
        return self.width * self.height

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def calculate_area(self):
        return self.side**2
```

### Liskov Substitution Principle (LSP)

Simply put, Liskov substitution principle emphasizes that subclasses should inherit the behavior of their base classes. This means code written to work with a base class object should function correctly when using a subclass object, as long as the subclass methods fulfill the same purpose.

In other words, if you have a piece of code that works with a certain type of object (baseclass), it should also work seamlessly with any objects of its subclasses, as long as those subclasses adhere to the same behavioral contract.

#### Violating LSP

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def calculate_area(self):
        return self.width * self.height

class Square(Rectangle):
    def __setattr__(self, key, value):
        if key in ("width", "height"):
            self.__dict__["width"] = value
            self.__dict__["height"] = value
```

This code is a bad example of the LSP because the `Square` <em> class violates the expected behavior of its parent class Rectangle in terms of setting width and height.</em>

Inconsistent Setter Behavior:

- The `Rectangle` class has separate setters for `width` and `height` in its constructor.

- The `Square` class overrides the default `__setattr__` method to ensure both `width` and `height` are always set to the same value (side).

Unexpected Behavior:

- Code expecting a `Rectangle` object might set the `width` and `height` independently.

- However, using a `Square` object with this code would result in both `width` and `height` being set to the same value (side), even if the programmer intended them to be different.

- This unexpected behavior breaks the LSP principle because a `Square` object doesn't behave exactly as a `Rectangle` object when it comes to setting dimensions.

#### Following LSP

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def calculate_area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def calculate_area(self):
        return self.width * self.height

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def calculate_area(self):
        return self.side ** 2
```
The `Shape` class acts as a blueprint for shape objects, defining the core behavior (area calculation) that subclasses must possess. Subclasses like `Rectangle` and `Square` are required to implement `calculate_area()`, ensuring consistency. This design allows for code that operates on Shape objects to work seamlessly with any subclass instance, promoting code reusability.

```python
def process_shape(shape: Shape):
  area = shape.calculate_area()
  print("Area:", area)

rectangle = Rectangle(4, 5)
square = Square(3)

process_shape(rectangle)  
# Will print "Area: 20"

process_shape(square)    
# Will print "Area: 9"
```
The process_shape function can handle both Rectangle and Square objects without modification, demonstrating LSP in action.

### Interface Segregation Principle (ISP)

`Clients mustn’t be obliged to implement interfaces and methods that are unnecessary for their purposes.` The objective of ISP is to break down single general purpose interface into smaller and more specific ones, so that clients only need to know about the interfaces they are interested in.

It’s recommended not to force classes, modules and components to be bound up with, or even know, methods they do not need. The aim is to keep abstractions as hidden as possible. Using small, custom interfaces helps minimize dependencies and supports a flexible, stable and testable architecture.

#### Violating ISP

```python
from abc import ABC, abstractmethod

class Printer(ABC):
    @abstractmethod
    def print(self, document):
        pass

    @abstractmethod
    def fax(self, document):
        pass

    @abstractmethod
    def scan(self, document):
        pass

class OldPrinter(Printer):
    def print(self, document):
        pass

    def fax(self, document):
        pass

    def scan(self, document):
        pass
```
The `Printer` interface defines three methods: `print`, `fax`, and `scan`. This implies that any class implementing `Printer` (like `OldPrinter` and `ModernPrinter`) must provide implementations for all three methods, even if they don't have that functionality.

#### Following ISP

```python
from abc import ABC, abstractmethod

class Printer(ABC):
    @abstractmethod
    def print(self, document):
        pass

class Fax(ABC):
    @abstractmethod
    def fax(self, document):
        pass

class Scanner(ABC):
    @abstractmethod
    def scan(self, document):
        pass

class OldPrinter(Printer):
    def print(self, document):
        pass

class NewPrinter(Printer, Fax, Scanner):
    def print(self, document):
        pass

    def fax(self, document):
        pass

    def scan(self, document):
        pass
```
This code exemplifies the ISP by defining three distinct interfaces: Printer, Fax, and Scanner. Each interface caters to a specific functionality (printing, faxing, or scanning). This separation allows for greater flexibility in implementing these functionalities.

### Dependency Inversion Principle (DIP)

The DIP advocates for the decoupling of high-level and low-level modules within a system. According to DIP, high-level modules, which contain the core logic and functionality of an application, should not depend on low-level modules, which are more about utility and implementation details. Instead, both should rely on abstractions, such as interfaces or abstract classes.

Key Aspects of DIP:

1. High-level modules should not depend on low-level modules. Both should depend on abstractions.

2. Abstractions should not depend on details. Details should depend on abstractions.

The key issue here lies in the tight coupling between high-level modules (e.g., business logic) and low-level modules (e.g., libraries or APIs). When high-level modules depend directly on low-levels modules, any changes to low-level modules can have direct effects on them and force them to change. In such dependency designs, it becomes difficult to reuse the high-level modules. Nonetheless, when the high-level modules are independent of the low-level modules, they can be more easily and simply reused or moved.

This summarizes the logic behind the dependency inversion principle. By adhering to DIP, software systems become more resilient to changes. When low-level modules need modification, high-level modules remain unaffected, facilitating easier maintenance and scalability.

#### Violating DIP

```python
class Service:
    def send_email(self, message):
        print(f"Sending email: {message}")

class OrderProcessor:
    def __init__(self):
        self.email_service = Service()

    def process_order(self, order):
        self.email_service.send_email(f"Order processed: {order}")
```
In this example, the `OrderProcessor` class relies on the `Service` class and its specific implementation. This means the two classes are tightly coupled, which can result in scalability problems. What if you want your app to be able to send a SMS message. How would you do that?


You may think of adding a new method to `Service` to send a SMS message. However, that will also require you to modify `OrderProcessor`, which should be closed to modification, according to the open-closed principle.

#### Following DIP

```python
from abc import ABC, abstractmethod

class NotificationService(ABC):
    @abstractmethod
    def send_notification(self, message):
        pass

class EmailService(NotificationService):
    def send_notification(self, message):
        print(f"Sending email: {message}")

class SMSService(NotificationService):
    def send_notification(self, message):
        print(f"Sending SMS: {message}")

class OrderProcessor:
    def __init__(self, notification_service: NotificationService):
        self.notification_service = notification_service

    def process_order(self, order):
        self.notification_service.send_notification(f"Order processed: {order}")
```
In this example, the `OrderProcessor` class does not depend on a specific implementation of the `NotificationService`. Instead, it depends on the `NotificationService` interface, allowing for easy substitution of different notification mechanisms, thus adhering to the Dependency Inversion Principle.

## Conclusion

By adhering to SOLID principles, we can create systems that are robust, maintainable, and scalable, ensuring high-quality software that meets changing requirements. These principles provide a roadmap for better software design and architecture.

---

## Resources
- [SOLID Principles in Python](https://realpython.com/solid-principles-python/)
- [SOLID: The First 5 Principles of Object-Oriented Design](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
- [What is SOLID? Principles for Better Software Design](https://www.freecodecamp.org/news/solid-principles-for-better-software-design/)
- [SOLID on Wikipedia](https://en.wikipedia.org/wiki/SOLID)
