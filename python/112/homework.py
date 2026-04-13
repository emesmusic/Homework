from die import Die

die = Die()

print('die:')
for roll in range(10):
    print(die.roll())
    
    
die_1 = Die(12)

print('die_1:')
for roll in range(10):
    print(die_1.roll())