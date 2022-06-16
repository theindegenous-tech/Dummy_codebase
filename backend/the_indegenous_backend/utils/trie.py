class TrieNode:
  def __init__(self, letter):
    self.letter = letter
    self.children = {}
    self.is_end_of_word = False

class Trie:
  def __init__(self):
    self.root = TrieNode("*")
  
  def add_word(self, word):
    currentNode = self.root
    for letter in word:
      if letter not in currentNode.children:
        currentNode.children[letter] = TrieNode(letter)
      currentNode = currentNode.children[letter]
    currentNode.is_end_of_word = True
  
  def search_word(self, word):
    if word == "":
      return True
    currentNode = self.root
    for letter in word:
      if letter not in currentNode.children:
        return False
      currentNode = currentNode.children[letter]
    return currentNode.is_end_of_word 


