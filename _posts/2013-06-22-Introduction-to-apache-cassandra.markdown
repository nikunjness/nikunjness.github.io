---
layout: post
title:  "Introduction to Apache Cassandra"
date:   2013-06-22 17:34:00
comments: true
categories: technology
---

Apache Cassanrda, simply it is a " massively scalable, decentralized, structured datastore (aka database)".

Being an open source high performance database designed for real time transaction and analysis, it provides faster read and write operations which takes just sub milliseconds to perform the task. Cassandra is a NoSQL Column family implementation supporting the Big Table data model (intoduced by Google, [See here](http://en.wikipedia.org/wiki/BigTable)) using the architectural aspects introduced by [Amazon Dynamo](http://aws.amazon.com/dynamodb/).

Cassandra is for use cases where high read and write performance is needed or large storage requirements will continue to grow over time. It allows you to grow as you need and add resources on your schedule to handle those demands.

Cassandra data model is composed of columns, rows, column families and keyspace. Now lets understand these terms more precisely.


What is column?
----

* It is most basic unit of cassandra data modes consist of a name, a value and a timestamp.*


What is row?
----
* A set of columns grouped together compose a row which is labeled with a specific name. See example below:*

~~~~~~
        "NoSQL"-> {
            author="Someone",
            publishedDate="..",
            tag1="Database",
            tag2="Technology"
        }
~~~~~~


What is column family?
----

* A collection of rows labeled with a name. See example below:*

~~~~~~
    Books-> {
        "NoSQL"-> {
            author="Someone",
            publishedDate=".."
            },
        "NoSQL: Part II"-> {
            author="Someone",
            publishedDate=".."
            },
        …
    }
~~~~~~


What is keyspace?
----

* The logical grouping of the column families forms a keyspace.*

What is super column?
----

* Super columns resides into the column family that groups several columns under one key.* 

