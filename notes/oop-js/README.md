
USER DEFINED OBJECT

//Direct Instance of an Object
var personObj1 = new Object();
personObj1.id = 8;
personObj1.name = "Akash";
personObj1.getData = function(){
	return this.id + " " + this.name;
}

//Empty Object
var personObj2 = {};

//Object Literal
var personObj3 = {
	id:1,
	name:"Aditya",
	getData:function(){
		return this.id + " " + this.name;
	}
}

//Using Template
function personObj(id,name){
	this.id=id;
	this.name=name;
	this.getData = function(){
		return this.id + " " + this.name;
	}
}

personObj4 = new personObj(1,"Aryan");
//Deleting Property
delete personObj4.name; 

// Object.defineProperty() - method defines a new property 
// directly on an object or modifies an existing property on
// an object and return the object.

Object.defineProperty(man, 'species', {
	value: 'Human Being',
	writable: false,
	configurable: false,
	enumerable: true
});

//Constructor Level Function
function Employee(r){
this.role =r;
this.display = function()
{
	alert('CTOR Level '+this.role);
}
}

//Prototype Level Function
Employee.prototype.display = function(){
	alert("Prototype Level "+this.role);
}

//Object Level Function
emp1.display = function(){
	alert('Object Level '+this.role);
}

//Abstraction And Encapsulation
function Person(){
this.Id = 100;
this.hobbies = ['Music','Cricket'];
// private data member
var name="Default";
// private method
var privateMethod = function(){
	console.log("Calling Private Method!");
}
// Priviledged Method
this.getInfo = function(){
	privateMethod();
	return this.Id+' '+name;
}             
Person.population++;   
}

// Static property
Person.population = 0;

// Inheritance using Prototype Chaining
Child.prototype = new Parent('Mother');
Child.prototype.constructor = Child;

Limitations
1. Arguments can't be passed to the super/base class data member while creating sub/derived class object.
2. Inherited Instance Properties of super /base class become
// Inheritance using classical Inheritance
function Child(rel){                                
	Parent.call(this,rel);// Inheritance
}    

Limitations
1. No Function reuse - inmemory no reuse
2. Child can't access methods defined at parent's prototype level

// 3. Pseudoclassical Inheritance - Combination of
// prototype chaining and classical inheritance

// Human - base/super class
// Student - derived/sub class

function Human(name){
	this.name = name;
}

Human.prototype.introduction = function(){
	alert('Hi, I am '+this.name);
}
// Prototype Chaining
Student.prototype = new Human();
Student.prototype.constructor = Student;

function Student(nm,college,courses){                      
	Human.call(this,nm);// Classical Inheritance
	this.college = college;
	this.courses = courses;
}

Student.prototype.introduction = function(){
	alert('Hi, I am '+this.name+
			', I am a student of '+this.college+
			', I study '+this.courses);
}
Student.prototype.takeExams = function(){
	alert('This is Exam time!');
}
// polymorphism
function letMeIntroduce(obj){
	obj.introduction();// polymorphism
}            
// with closure
var getHits = (function () {
	var hits = 0;// initialized to 0
	function addHits() { // lexical scope
		hits++;
		return hits;
	}            
	return addHits;
})();

// closure is able to retain the environment of the outer function.

//Module Pattern
var empModule = (function(){
var empList = [];
return {
	add:function(e){
		empList.push(e);
	},
	show:function(){
		for(var index in empList){
			console.log(empList[index]);
		}
	}
}
})();// IIFE

