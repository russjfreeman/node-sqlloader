/*testOne*/
Select firstname from user where id=1
;

/*testTwo*/
Select firstname
from user
inner join hobbies on hobbies.userID = user.id
where id=1
;




/*testTwo*/
Select firstname from user where id=1
;
