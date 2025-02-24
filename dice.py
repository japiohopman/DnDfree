import random

attack_roll = random.randint(1, 20) + 4

# Roll damage if the attack hits (Longsword: 1d8 + 2)
damage_roll = random.randint(1, 8) + 2

print(attack_roll, damage_roll)