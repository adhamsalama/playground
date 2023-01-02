class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        n1 = len(s1)
        n2 = len(s2)
        hash1 = {}
        hash2 = {}
        for c in [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
        ]:
            hash1[c] = 0
            hash2[c] = 0
        for c in s1:
            hash1[c] = hash1[c] + 1
        for i in range(n1):
            hash2[s2[i]] = hash2[s2[i]] + 1
        # print(hash1)
        print(hash1)
        print(hash2)
        for i in range(n2 - n1 + 1):
            hash2[s2[i + n1]] = hash2[s2[i + n1]] + 1
            print(s2[i : i + n1])
            print("one", hash1)
            print("two", hash2)
            if hash1 == hash2:
                return True
            else:
                hash2[s2[i]] = 0
        return False

    def sol2(self, s1: str, s2: str) -> bool:
        n1 = len(s1)
        n2 = len(s2)
        hash1 = {}
        hash2 = {}
        for c in [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
        ]:
            hash1[c] = 0
            hash2[c] = 0
        for i in range(n1):
            hash1[s1[i]] += 1
            hash2[s2[i]] += 1
        for i in range(n2):
            # print(s2[i : i + n1])
            # print(hash1)
            # print(hash2)
            if hash1 == hash2:
                return True
            hash2[s2[i]] -= 1
            hash2[s2[i + n1]] += 1
        return False


sol = Solution()
# print(sol.sol2("adc", "dcda"))
# print(sol.sol2("abcdxabcde", "abcdeabcdx"))
print(sol.sol2("ab", "eidbaooo"))
