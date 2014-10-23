---
layout: post
title: "Never build a login again: The art of  using Social Auth"
categories: technology
---

How lucky day it was when I received acceptance email from DjangoCon 2014 for my talk “Never build a login again: The art of using Social Auth”. But after that it happened a series of events and unfortunately I couldn't make it to the event. :(

Happens. With this blog post, let me share whatever I was supposed to present there.

Whenever it comes to the web application, the designer guy in your team starts thinking about a page with those two text-boxes containing label user name and password and the other page full of text-boxes and date-pickers asking customer/user about his/her existence. The database designer has already created the USERS table in his mind. And everyone else in the team are roaming around those thoughts. And it seems natural to us. This is how we begun developing applications. Even the most experienced guy in the team agrees to the fact that we need Login and Registration pages in our website/App. So far in my career I spent most of the time working on web projects and played all the roles mentioned above.

Though, I didn't get the chance to think about whatever I am doing is correct or not. And how will one think about it if everyone agrees on having them. But luckily I got the chance during my internship period earlier this year. Two major factors played big role in making me think whatever I am doing is correct or not.

1. The team which has mixture of Highly experienced, experienced and novice members

2. The organization which is committed towards adopting Agile culture but not just for the namesake

Ah! Lots of off-topic things. Don't kill me for this and stop reading here.  Let me first justify the title. Whatever I am talking here doesn't apply to all kind of applications. The basic idea behind saying this is the rule of simplicity and rapid development. Most of the time if you are using some framework like Django or so and it will do the job for you but still the question remains the same.

###Do you actually need to have your own user management module?

The process starts with thinking about those two pages and a table in the database. But it doesn't end there. After that comes a lot of other things. Will you be using email as user-name or allow your users/customers to create customized user-names? In both of the cases you need to put that availability check for user-name or account existence. And then that must have forgot password link that resides forever by your login button. You need implement that functionality too. Ah I can give plenty of other things here like confirmation emails, password strength etc.

###Are you ready to put that ugly Captcha on your registration page?

No offense but personally I feel that that's the worst thing I have ever seen on websites. Everybody hates them but we as a developer knows the importance of it. However there are alternatives that we can use instead of Captcha.

###Are you ready to store the crucial information of users/customers on your servers?

Security is always a concern whether you are a giant or beginner. But it's up to you if you want to take risk of storing personal details of users/customers on your servers and getting screwed when it gets leaked. Users trusts giants and so we. If someone is ready to take that responsibility for you why not use that?

In era of Agile software development, wasting time behind building user management functionalities is a bit overhead. There are plenty of use cases where products failed just because they were unable to attract users. I saw people not using Websites/Apps just because they are asking for too much unnecessary details. The basic mantra is to know your customers and then make decision. If you know you are targeting people who are active on social media then why not allow them to use the same service to use your app?

If you know your target customers/users are using LinkedIn then why not allow them to Log-in with their LinkedIn account? In other case I have not only used social authentication from Dropbox for Logging-in the users but space from users' account to store the documents/files which they are using from our app.

So enough of reasoning, now lets see how easy is to use the Social Auth(entication) with the Django framework. If you ask why Djnago, then here is the answer. It took me almost Zero line of code* to implement this. I played with the configuration files and HTML page and the job is done.

 