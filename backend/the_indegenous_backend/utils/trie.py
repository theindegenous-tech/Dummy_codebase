# Python3 program to demonstrate auto-complete
# feature using Trie data structure.
# Note: This is a basic implementation of Trie
# and not the most optimized one.
 
 
# Initialising one node for trie
class TrieNode():
    def __init__(self):
      self.children = {}
      self.last = False
 
 
# Initialising the trie structure.
class Trie():
    def __init__(self):
      self.k = 2
      self.cur_k = 0
      self.root = TrieNode()
    
    # Forms a trie structure with the given set of strings
    # if it does not exists already else it merges the key
    # into it by extending the structure as required
    def formTrie(self, keys):
      for key in keys:
          self.insert(key)  # inserting one key to the trie.
 
    # Inserts a key into trie if it does not exist already.
    # And if the key is a prefix of the trie node, just
    # marks it as leaf node.
    def insert(self, key):
      node = self.root
      for a in key:
        if not node.children.get(a):
            node.children[a] = TrieNode()

        node = node.children[a]

      node.last = True
 
    # Method to recursively traverse the trie
    # and return a whole word.
    def suggestion(self, node, word, results, ):
      if(self.cur_k > self.k):
          return

      if node.last:
        self.cur_k+=1
        results.append(word)

      for a, n in node.children.items():
        self.suggestion(n, word + a, results)
 
    # Returns all the words in the trie whose common
    # prefix is the given key thus listing out all
    # the suggestions for autocomplete.
    def getAutoSuggestions(self, key,):
      node = self.root
      results=[]
      for a in key:
        # no string in the Trie has this prefix
        if not node.children.get(a):
            return 0
        node = node.children[a]
          
      # If prefix is present as a word, but
      # there is no subtree below the last
      # matching node.
      if not node.children:
        return -1

      self.suggestion(node, key, results)
      self.cur_k = 0
      return results
 
 
