

"""
Generates random inputs from given parameters as input.
Made by:    {  'Ceballos Alonso Laura Valentina', 
                'Díaz Medina César Esteban', 
                'Silva Capera Daniel Santiago'
            }
"""

# ? Usually in prgramming contests, the first parameter given as input is
# ? the ammount of test cases.
# ? The options could be: None, one, a finite number of tests or undifined number of tests

import itertools
import random
import string


class FormatInput:
    list_formats = {
        "separator": " ",
        "end": "",
    }
    parameters_format = {
        "begin": "",
        "end": "",
        "separator": " ",
    }
    input_types = {  #! For now just uncommented the ones that are already implemented
        # "Blank",
        "Any",
        "Next Line",
        "Integer",  # * Class Done
        "Float",  # * Class Done
        "String",  # * Class Done
        "Character",  # * Class Done
        "Boolean",  # * Class Done
        "List",
        # "Tuple",
        # "Set",
        # "Dictionary",
        # "Array",
        # "Matrix",
        # "Graph",
        # "Tree",
        # "Binary Tree",
        # "Binary Search Tree",
        # "Heap",
        # "Stack",
        # "Queue",
        # "Linked List",
        # "Doubly Linked List",
        # "Circular Linked List",
        # "Circular Doubly Linked List",
        # "Hash Table",
        # "Trie",
        # "Directed Graph",
        # "Undirected Graph",
        # "Weighted Graph",
        # "Directed Weighted Graph",
        # "Undirected Weighted Graph",
        # "Directed Acyclic Graph",
        # "Undirected Acyclic Graph",
        # "Directed Acyclic Weighted Graph",
        # "Undirected Acyclic Weighted Graph",
        # "Directed Cyclic Graph",
        # "Undirected Cyclic Graph",
        # "Directed Cyclic Weighted Graph",
        # "Undirected Cyclic Weighted Graph",
        # "Binary Search Tree",
        # "Binary Search Tree with Duplicate Keys",
        # "Binary Search Tree with Duplicate Keys and Parent Pointers",
        # "Binary Search Tree with Parent Pointers",
        # "Binary Search Tree with Parent Pointers and Duplicate Keys",
    }

    def __init__(
        self, ins: list, parameters_format: dict = parameters_format
    ):  # ,condition):
        # ? The ins list should be seen like this: [Integer, Integer, Float, List]
        # ? By default, the list will be separated by spaces 'Integer Integer Float List'
        # ? for an input with 4 parameters, the first one is an integer,
        # ? the second one is an integer,
        # ? the third one is a float and the fourth one is a list.
        # ? The generator will output a list like this [1, 2, 3.0, [1,2,3,4,5]]
        # ? The list will be separated by spaces '1 2 3.0 [1,2,3,4,5]'
        # ? The lists and matrices can have its own format given by the user.

        raise NotImplementedError

x = 0 

class IntegerRandoms:
    def __init__(self, min_length, max_length, condition: str = "True", name:str='x'): #! Pending to write variable names
        self.min_length = min_length
        self.max_length = max_length
        self.condition = condition

    def get_random(self):
        return next(
            x
            for x in map(
                lambda x: random.randint(self.min_length, self.max_length) | 1, itertools.count()
            )
            if eval(self.condition)
        )


class FloatRandoms:
    def __init__(self, min_length, max_length, condition: str = "True", format: int = 2 , name:str='x'):
        self.min_length = min_length
        self.max_length = max_length
        self.condition = condition
        self.format = format

    def get_random(self):
        ##! return a random float number with *format* decimals

        return next(
            x
            for x in map(
                lambda x: random.uniform(self.min_length, self.max_length), itertools.count()
            )
            if eval(self.condition)
        )


class CharacterRandoms:
    def __init__(self, min_length: int = 97, max_length: int = 122, condition: str = ""):
        self.min_length = min_length  #! ASCII code
        self.max_length = max_length  #! ASCII code
        if condition == "" or condition == "None" or condition == "Unrestricted":
            self.condition = "True"
        else:
            self.condition = condition

    def get_random(self):
        return next(
            x
            for x in map(
                lambda x: chr(random.randint(self.min_length, self.max_length)), itertools.count()
            )
            if eval(self.condition)
        )


class BooleanRandoms:
    bool_formats = {
        "nums",
        "lettersUCC",
        "lettersL",
        "lettersU",
    }
    bools = {
        1: "True",
        0: "False",
    }

    def __init__(self, format: str = ""):
        self.format = format

    def get_random(self):
        bool_value = random.randint(0, 1)
        if self.format == "lettersUCC": #Upper camelCase
            return self.bools[bool_value].upper()
        elif self.format == "lettersL": #lower
            return self.bools[bool_value].lower()
        elif self.format == "lettersU": #upper
            return self.bools[bool_value].capitalize()
        return self.bools[bool_value]


class StringRandom:
    content_types = {  #! For now just uncommented the ones that are already implemented
        # 'mixed nums and letters UCC',
        # 'mixed nums and letters L',
        # 'mixed nums and letters U',
        # "nums",
        "letters english",
        # 'letters UCC',
        # 'letters L',
        # 'letters U',
        # 'special chars',
        # 'special chars UCC',
        # 'special chars L',
        # 'special chars U',
        # 'special chars and nums',
        # 'special chars and nums UCC',
        # 'special chars and nums L',
        # 'special chars and nums U',
        "random",
        "mixed with words",
        "just words",
    }

    def __init__(
        self,
        content_type: str = "random",
        min_length: int = 1,
        max_length: int = 10,
        word_set: list = [],
        condition: str = "",
    ):
        self.min_length = min_length
        self.max_length = max_length
        self.word_set = word_set
        self.content_type = content_type
        if condition == "" or condition == "None" or condition == "Unrestricted":
            self.condition = "True"
        else:
            self.condition = condition

    def get_random(self):
        if self.word_set and self.content_type == "just words":
            return "".join(random.choice(self.word_set))
        elif self.word_set and self.content_type == "mixed with words":
            word_or_random = random.randint(0, 1)  # ? 0 for random, 1 for word
            if word_or_random:
                return "".join(random.choice(self.word_set))
            else:
                res = "".join(
                    random.choices(
                        string.ascii_lowercase + string.digits,
                        k=random.randint(self.min_length, self.max_length),
                    )
                )

                return res
        elif self.content_type == "letters english":
            res = "".join(
                random.choices(
                    string.ascii_lowercase,
                    k=random.randint(self.min_length, self.max_length),
                )
            )

            return res
        else:
            res = "".join(
                random.choices(
                    string.ascii_lowercase + string.digits,
                    k=random.randint(self.min_length, self.max_length),
                )
            )

            return res


class ListRandom:

    content_types = FormatInput.input_types

    def __init__(
        self,
        length_type: str = "fixed",
        min_length: int = 1,
        max_length: int = 10,
        content_type: str = "Int",
    ):
        if length_type == "fixed":
            self.min_length = max_length
        else:
            self.min_length = min_length
        self.max_length = max_length

        self.length = random.randint(self.min_length, self.max_length)
        self.content_type = content_type

    def get_random(self):
        if self.content_type == "Int":
            x = IntegerRandoms ( 0 , 1000000 )
            for i in range ( 0 , self.length ):
                print ( x.get_random() , end = " ")
            print ( )
        if self.content_type == "Float":
            x = FloatRandoms ( 0 , 1000000 )
            for i in range ( 0 , self.length ):
                print ( x.get_random() , end = " ")
            print ( )
        if self.content_type == "Boolean":
            x = BooleanRandoms ( )
            for i in range ( 0 , self.length ):
                print ( x.get_random() , end = " ")
            print ( )
             
            #!for each element of list (min, max), request content_type
        # else:
        #     for i in range(self.ength):


class PermutationRandom:
    def __init__(
        self,
        n,
    ):
        self.n = n
    def get_random(self):
        x = []
        for i in range ( 0 , self.n ):
            x.append ( i+1 ) ; 
        random.shuffle ( x )
        for i in range ( 0 , self.n ):
            if ( i + 1 != self.n  ):
                print ( x [i] , end = ' ' ) 
            else:
                print ( x [i]  ) 
integer_1 = 0 
integer_1 = IntegerRandoms ( 6 , 12 , condition = "x>10" , name = integer_1 )
integer_1 = integer_1.get_random()
print ( integer_1 ) 
                
                
p = 0.0 
p = FloatRandoms ( 20.0 , 50.0 , condition =  "x>integer_1" , name = p)
p = p.get_random()
print ( p )
                
                
x = BooleanRandoms ( format = "lettersUCC" )
print ( x.get_random() ) 
                
                
x = CharacterRandoms ( min_length =90 
, max_length =128 
)
print ( x.get_random() ) 
				
                
                
x = PermutationRandom ( 20 )
x.get_random() 
                
                
x = ListRandom ( min_length =12 
,  max_length =12 
)
x.get_random() 
                
                
x = StringRandom ( word_set =['a'
, 'b'
, 'c'
, 'd'
]
)
print ( x.get_random() ) 
		
                
                
y = 0 
y = IntegerRandoms ( 1 , 50 , y  )
y = y.get_random()
print ( y ) 
                
                
x = FloatRandoms ( 30.0 , 80.0 , condition =  "x>y" )
print ( x.get_random() ) 
                
                
                   
