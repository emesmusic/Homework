import random

print('Welcome to the guessing game.')
while True:
    
    
    while True:
        try:
            min = int(input('Enter the minimum integer that you want to guess from: '))
            break
        except ValueError:
            print('Please enter a valid integer.')
            
    while True:
        try:
            max = int(input('Enter the maximum number that you want to guess to: '))
            break
        except ValueError:
            print('Please enter a valid integer.')
    
    number = random.randint(min, max)
    guesses = 0
    game_over = False
    while not game_over:
        if min == max:
            print(f'Your minimum and maximum integers are identical. Please choose two different integers.')
            break
        while True:
            try:
                guess = int(input('Enter your guess: '))
                break
            except ValueError:
                print('Please enter a valid integer.')
        guesses+=1
        if guess == number:
            print(f'Congratulations! You guessed the number in {guesses} guesses.')
            play_again = input('Would you like to play again? Press y for yes. Press anything else for no: ')
            if play_again.lower() == 'y':
                game_over = True
            else:
                exit()
        elif guess < number:
            print('Your guess is too low.')
        elif guess > number:
            print('Your guess is too high.')