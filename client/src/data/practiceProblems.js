// Comprehensive LeetCode Practice recommendations mapped to each module & topic
export const practiceProblemsDatabase = {
  'mod-learn-cpp': [
    {
      id: 'lc-9',
      title: 'Palindrome Number',
      lcNumber: 9,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/palindrome-number/',
      pattern: 'Math & Conditionals',
      hint: 'Reverse the second half of the number and compare with the first half to avoid integer overflow.',
      recommendedAfter: '08. Switch Case in C++'
    },
    {
      id: 'lc-7',
      title: 'Reverse Integer',
      lcNumber: 7,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/reverse-integer/',
      pattern: 'Basic Math & Overflow Handling',
      hint: 'Check if rev > INT_MAX/10 or rev < INT_MIN/10 before multiplying by 10.',
      recommendedAfter: '05. Variables and Datatypes'
    },
    {
      id: 'lc-1281',
      title: 'Subtract the Product and Sum of Digits of an Integer',
      lcNumber: 1281,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/',
      pattern: 'Loops & Modulo',
      hint: 'Extract digits using n % 10, accumulate sum and product, then update n = n / 10.',
      recommendedAfter: '10. For and While Loop'
    },
    {
      id: 'lc-191',
      title: 'Number of 1 Bits (Hamming Weight)',
      lcNumber: 191,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/number-of-1-bits/',
      pattern: 'Bit Manipulation',
      hint: 'Use n = n & (n - 1) to clear the lowest set bit in each step.',
      recommendedAfter: '13. Binary and Decimal Number System'
    }
  ],
  'mod-programming-in-cpp': [
    {
      id: 'lc-231',
      title: 'Power of Two',
      lcNumber: 231,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/power-of-two/',
      pattern: 'Bitwise Tricks',
      hint: 'A positive number n is power of two if (n > 0) && (n & (n - 1)) == 0.',
      recommendedAfter: '01. L1-Basics of Programming'
    },
    {
      id: 'lc-1009',
      title: 'Complement of Base 10 Integer',
      lcNumber: 1009,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/complement-of-base-10-integer/',
      pattern: 'Bitwise Mask',
      hint: 'Create a bitmask of all 1s of the same length as n, then return (~n) & mask.',
      recommendedAfter: '03. L3-Basics of Programming'
    }
  ],
  'mod-patterns': [
    {
      id: 'lc-118',
      title: "Pascal's Triangle",
      lcNumber: 118,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/pascals-triangle/',
      pattern: 'Nested Loops & Math',
      hint: 'Each entry row[j] = prevRow[j-1] + prevRow[j].',
      recommendedAfter: '03. L3-Pattern Printing'
    },
    {
      id: 'lc-119',
      title: "Pascal's Triangle II",
      lcNumber: 119,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/pascals-triangle-ii/',
      pattern: '1D Array Space Optimization',
      hint: 'Update the array backwards from right to left to do it in O(K) memory.',
      recommendedAfter: '04. MS-Pattern Printing'
    }
  ],
  'mod-arrays': [
    {
      id: 'lc-1',
      title: 'Two Sum',
      lcNumber: 1,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/two-sum/',
      pattern: 'Hash Map Lookup',
      hint: 'Store target - nums[i] in an unordered_map with its index.',
      recommendedAfter: '03. L1-Arrays'
    },
    {
      id: 'lc-53',
      title: 'Maximum Subarray (Kadane’s Algorithm)',
      lcNumber: 53,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/maximum-subarray/',
      pattern: "Kadane's Algorithm",
      hint: 'Maintain currentSum; if currentSum < 0, reset to 0. Track overall maxSum.',
      recommendedAfter: '05. L2-Arrays'
    },
    {
      id: 'lc-189',
      title: 'Rotate Array',
      lcNumber: 189,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/rotate-array/',
      pattern: '3-Step Reversal',
      hint: 'Reverse entire array, then reverse first k elements, then reverse remaining n-k elements.',
      recommendedAfter: '06. L3-Arrays'
    },
    {
      id: 'lc-48',
      title: 'Rotate Image (Matrix 90 deg)',
      lcNumber: 48,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/rotate-image/',
      pattern: 'Matrix Transpose + Reverse',
      hint: 'Transpose the matrix along main diagonal, then reverse each row horizontally.',
      recommendedAfter: '07. L4-Arrays'
    },
    {
      id: 'lc-54',
      title: 'Spiral Matrix',
      lcNumber: 54,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/spiral-matrix/',
      pattern: '4 Boundary Simulation',
      hint: 'Maintain top, bottom, left, right bounds and contract bounds after each side traversal.',
      recommendedAfter: '08. MS-Arrays'
    }
  ],
  'mod-c-stl': [
    {
      id: 'lc-217',
      title: 'Contains Duplicate',
      lcNumber: 217,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/contains-duplicate/',
      pattern: 'std::unordered_set',
      hint: 'Insert into unordered_set and check if size differs or element exists.',
      recommendedAfter: '01. Containers'
    },
    {
      id: 'lc-347',
      title: 'Top K Frequent Elements',
      lcNumber: 347,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/top-k-frequent-elements/',
      pattern: 'Min-Heap / Bucket Sort',
      hint: 'Count frequencies with unordered_map, then maintain a min-heap of size K.',
      recommendedAfter: '02. Algorithms'
    }
  ],
  'mod-sorting-and-searching': [
    {
      id: 'lc-704',
      title: 'Binary Search',
      lcNumber: 704,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/binary-search/',
      pattern: 'Standard Binary Search',
      hint: 'Use mid = left + (right - left) / 2 to avoid integer overflow.',
      recommendedAfter: '05. L1-Binary Search'
    },
    {
      id: 'lc-33',
      title: 'Search in Rotated Sorted Array',
      lcNumber: 33,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      pattern: 'Rotated Monotonic Halves',
      hint: 'Find which half is sorted, then check if target lies within that sorted range.',
      recommendedAfter: '06. L2-Binary Search'
    },
    {
      id: 'lc-852',
      title: 'Peak Index in a Mountain Array',
      lcNumber: 852,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/peak-index-in-a-mountain-array/',
      pattern: 'Monotonic Derivative',
      hint: 'If arr[mid] < arr[mid+1], peak is to the right; else it is at mid or left.',
      recommendedAfter: '06. L2-Binary Search'
    },
    {
      id: 'lc-410',
      title: 'Split Array Largest Sum (Book Allocation)',
      lcNumber: 410,
      difficulty: 'Hard',
      url: 'https://leetcode.com/problems/split-array-largest-sum/',
      pattern: 'Binary Search on Answer',
      hint: 'Search space: low = max(nums), high = sum(nums). Validate with isPossible greedy function.',
      recommendedAfter: '07. L3-Binary Search'
    },
    {
      id: 'lc-1552',
      title: 'Magnetic Force Between Two Balls (Aggressive Cows)',
      lcNumber: 1552,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/magnetic-force-between-two-balls/',
      pattern: 'Binary Search on Answer',
      hint: 'Maximize the minimum distance: test if placing m balls with distance >= mid is possible.',
      recommendedAfter: '08. MS-Searching and Sorting'
    },
    {
      id: 'lc-179',
      title: 'Largest Number',
      lcNumber: 179,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/largest-number/',
      pattern: 'Custom String Comparator',
      hint: 'Sort strings with comparator: (a + b) > (b + a). Edge case: if largest is "0", return "0".',
      recommendedAfter: '04. Custom Comparator in Sorting'
    }
  ],
  'mod-strings': [
    {
      id: 'lc-344',
      title: 'Reverse String',
      lcNumber: 344,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/reverse-string/',
      pattern: 'Two Pointers In-Place',
      hint: 'Swap s[left++] and s[right--] until left >= right.',
      recommendedAfter: '01. L1-Strings'
    },
    {
      id: 'lc-1047',
      title: 'Remove All Adjacent Duplicates In String',
      lcNumber: 1047,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/',
      pattern: 'Stack / String as Stack',
      hint: 'If result.back() == current, pop_back(); otherwise push_back().',
      recommendedAfter: '02. L2-Strings'
    },
    {
      id: 'lc-647',
      title: 'Palindromic Substrings',
      lcNumber: 647,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/palindromic-substrings/',
      pattern: 'Expand Around Center',
      hint: 'For every index i, expand odd center (i, i) and even center (i, i+1).',
      recommendedAfter: '03. L3-Strings'
    },
    {
      id: 'lc-443',
      title: 'String Compression',
      lcNumber: 443,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/string-compression/',
      pattern: 'Two Pointers Write Index',
      hint: 'Count consecutive characters, write character, then write count digits if > 1.',
      recommendedAfter: '04. MS-Strings'
    }
  ],
  'mod-pointers-and-basic-maths': [
    {
      id: 'lc-204',
      title: 'Count Primes (Sieve of Eratosthenes)',
      lcNumber: 204,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/count-primes/',
      pattern: 'Sieve of Eratosthenes',
      hint: 'Allocate vector<bool> isPrime(n, true). For prime i, mark multiples starting at i*i.',
      recommendedAfter: '04. Optimising Sieve and Segmented Sieve'
    },
    {
      id: 'lc-1979',
      title: 'Find Greatest Common Divisor of Array',
      lcNumber: 1979,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/find-greatest-common-divisor-of-array/',
      pattern: "Euclidean Algorithm",
      hint: 'Find min and max element, then run gcd(a, b) = gcd(b, a % b).',
      recommendedAfter: '01. Basics Maths for DSA'
    }
  ],
  'mod-recursion': [
    {
      id: 'lc-509',
      title: 'Fibonacci Number',
      lcNumber: 509,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/fibonacci-number/',
      pattern: 'Recursion Base Case',
      hint: 'Base cases: fib(0) = 0, fib(1) = 1. Relation: fib(n-1) + fib(n-2).',
      recommendedAfter: '01. L1-Recursion'
    },
    {
      id: 'lc-70',
      title: 'Climbing Stairs',
      lcNumber: 70,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/climbing-stairs/',
      pattern: 'Recursion / State Tree',
      hint: 'Number of ways to reach step n is ways(n-1) + ways(n-2).',
      recommendedAfter: '02. L2-Recursion'
    },
    {
      id: 'lc-78',
      title: 'Subsets (Power Set)',
      lcNumber: 78,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/subsets/',
      pattern: 'Include / Exclude Recursion',
      hint: 'Two recursive branches at each step: include nums[i] or exclude nums[i].',
      recommendedAfter: '03. L3-Recursion'
    },
    {
      id: 'lc-322',
      title: 'Coin Change',
      lcNumber: 322,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/coin-change/',
      pattern: 'Minimum Transition Tree',
      hint: 'minCoins(target) = 1 + min(minCoins(target - coin)). Memoize for O(N*target).',
      recommendedAfter: '04. MS-Recursion'
    }
  ],
  'mod-bt-and-dnc': [
    {
      id: 'lc-912',
      title: 'Sort an Array (Merge Sort)',
      lcNumber: 912,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/sort-an-array/',
      pattern: 'Divide and Conquer',
      hint: 'Split array into two halves, recursively sort, then merge with two pointers.',
      recommendedAfter: '02. L1 - BT and DnC'
    },
    {
      id: 'lc-51',
      title: 'N-Queens',
      lcNumber: 51,
      difficulty: 'Hard',
      url: 'https://leetcode.com/problems/n-queens/',
      pattern: 'Backtracking with O(1) HashMaps',
      hint: 'Use 3 boolean arrays: row, upper-left diagonal (row-col+n-1), lower-left diagonal (row+col).',
      recommendedAfter: '05. L3 - BT and DnC'
    },
    {
      id: 'lc-46',
      title: 'Permutations',
      lcNumber: 46,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/permutations/',
      pattern: 'Backtracking In-Place Swap',
      hint: 'Swap nums[i] with nums[idx], recurse for idx+1, then backtrack swap back.',
      recommendedAfter: '04. L2 - BT and DnC'
    },
    {
      id: 'lc-37',
      title: 'Sudoku Solver',
      lcNumber: 37,
      difficulty: 'Hard',
      url: 'https://leetcode.com/problems/sudoku-solver/',
      pattern: 'Backtracking 9x9 Grid',
      hint: 'Check row, column, and 3x3 subgrid validity: 3*(row/3) + i/3 and 3*(col/3) + i%3.',
      recommendedAfter: '06. MS - BT and DnC'
    }
  ],
  'mod-oops-concept': [
    {
      id: 'lc-705',
      title: 'Design HashSet',
      lcNumber: 705,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/design-hashset/',
      pattern: 'Class Design & Chaining',
      hint: 'Use an array of linked lists / vectors to handle hash bucket collisions.',
      recommendedAfter: '04. Implementing Encapsulation in C++'
    },
    {
      id: 'lc-706',
      title: 'Design HashMap',
      lcNumber: 706,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/design-hashmap/',
      pattern: 'Class Design & Key-Value Pairs',
      hint: 'Hash function key % BUCKET_SIZE, store pair<int, int> in bucket lists.',
      recommendedAfter: '06. Implementing Inheritance in C++'
    }
  ],
  'mod-linked-lists': [
    {
      id: 'lc-206',
      title: 'Reverse Linked List',
      lcNumber: 206,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/reverse-linked-list/',
      pattern: 'Iterative 3 Pointers',
      hint: 'Maintain prev, curr, next. Point curr->next = prev, advance prev = curr, curr = next.',
      recommendedAfter: '01. L1 - Linked Lists'
    },
    {
      id: 'lc-876',
      title: 'Middle of the Linked List',
      lcNumber: 876,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/middle-of-the-linked-list/',
      pattern: 'Floyd Tortoise and Hare',
      hint: 'Fast pointer moves 2 steps, slow pointer moves 1 step. When fast reaches end, slow is middle.',
      recommendedAfter: '02. L2 - Linked Lists'
    },
    {
      id: 'lc-141',
      title: 'Linked List Cycle',
      lcNumber: 141,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/linked-list-cycle/',
      pattern: 'Cycle Detection (Floyd)',
      hint: 'If fast and slow pointers meet, a cycle exists. If fast reaches nullptr, no cycle.',
      recommendedAfter: '03. L3 - Linked Lists'
    },
    {
      id: 'lc-25',
      title: 'Reverse Nodes in k-Group',
      lcNumber: 25,
      difficulty: 'Hard',
      url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
      pattern: 'Recursive K-Group Reverse',
      hint: 'Check if k nodes exist. If yes, reverse k nodes, recursively connect remaining list to head->next.',
      recommendedAfter: '04. L4 - Linked Lists'
    }
  ],
  'mod-stacks': [
    {
      id: 'lc-20',
      title: 'Valid Parentheses',
      lcNumber: 20,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/valid-parentheses/',
      pattern: 'Stack Matching',
      hint: 'Push opening brackets. On closing bracket, check if stack is non-empty and top matches.',
      recommendedAfter: '01. L1 - Stacks'
    },
    {
      id: 'lc-155',
      title: 'Min Stack',
      lcNumber: 155,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/min-stack/',
      pattern: 'O(1) Min Stack',
      hint: 'Store pairs (val, currentMin) or use formula 2 * val - minVal for O(1) extra space.',
      recommendedAfter: '02. L2 - Stacks'
    },
    {
      id: 'lc-84',
      title: 'Largest Rectangle in Histogram',
      lcNumber: 84,
      difficulty: 'Hard',
      url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
      pattern: 'Monotonic Stack',
      hint: 'Find previous smaller and next smaller element indices for each bar. Width = (right - left - 1).',
      recommendedAfter: '03. L3 - Stacks'
    }
  ],
  'mod-queues': [
    {
      id: 'lc-622',
      title: 'Design Circular Queue',
      lcNumber: 622,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/design-circular-queue/',
      pattern: 'Modulo Increment',
      hint: 'Maintain front and rear pointers. Advance with (rear + 1) % size.',
      recommendedAfter: '01. L1 - Queues'
    },
    {
      id: 'lc-239',
      title: 'Sliding Window Maximum',
      lcNumber: 239,
      difficulty: 'Hard',
      url: 'https://leetcode.com/problems/sliding-window-maximum/',
      pattern: 'Monotonic Deque',
      hint: 'Store indices in decreasing order of values in deque. Pop smaller elements from back before inserting.',
      recommendedAfter: '03. L3 - Queues'
    }
  ],
  'mod-trees': [
    {
      id: 'lc-102',
      title: 'Binary Tree Level Order Traversal',
      lcNumber: 102,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      pattern: 'Queue Level Traversal (BFS)',
      hint: 'Process nodes level by level using queue size in an inner loop.',
      recommendedAfter: '01. L1 - Binary Trees'
    },
    {
      id: 'lc-543',
      title: 'Diameter of Binary Tree',
      lcNumber: 543,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/diameter-of-binary-tree/',
      pattern: 'Post-Order Bottom Up',
      hint: 'Compute height recursively; update max diameter seen so far as leftHeight + rightHeight.',
      recommendedAfter: '02. L2 - Binary Trees'
    },
    {
      id: 'lc-236',
      title: 'Lowest Common Ancestor of a Binary Tree',
      lcNumber: 236,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
      pattern: 'DFS Subtree Traversal',
      hint: 'If both left and right recursive calls return non-null, root is the LCA.',
      recommendedAfter: '03. L3 - Binary Trees'
    }
  ],
  'mod-bsts': [
    {
      id: 'lc-700',
      title: 'Search in a Binary Search Tree',
      lcNumber: 700,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/search-in-a-binary-search-tree/',
      pattern: 'BST Search Property',
      hint: 'If val < root->val go left; if val > root->val go right.',
      recommendedAfter: '01. L1 - BST'
    },
    {
      id: 'lc-98',
      title: 'Validate Binary Search Tree',
      lcNumber: 98,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/validate-binary-search-tree/',
      pattern: 'Valid Range Bounds',
      hint: 'Pass (minVal, maxVal) down the tree: validate(root, LLONG_MIN, LLONG_MAX).',
      recommendedAfter: '02. L2 - BST'
    },
    {
      id: 'lc-230',
      title: 'Kth Smallest Element in a BST',
      lcNumber: 230,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
      pattern: 'Inorder Traversal Property',
      hint: 'Inorder traversal of BST visits elements in sorted order. Decrement k until k == 0.',
      recommendedAfter: '03. L3 - BST'
    }
  ],
  'mod-heaps': [
    {
      id: 'lc-215',
      title: 'Kth Largest Element in an Array',
      lcNumber: 215,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
      pattern: 'Min-Heap of Size K',
      hint: 'Maintain min-heap of size K: if current > top, pop and push current. Top is answer.',
      recommendedAfter: '01. L1 - Heaps'
    },
    {
      id: 'lc-295',
      title: 'Find Median from Data Stream',
      lcNumber: 295,
      difficulty: 'Hard',
      url: 'https://leetcode.com/problems/find-median-from-data-stream/',
      pattern: 'Two Heaps (Max-Heap & Min-Heap)',
      hint: 'Max-heap for lower half, min-heap for upper half. Balance sizes within difference 1.',
      recommendedAfter: '02. L2 - Heaps'
    }
  ],
  'mod-maps-n-tries': [
    {
      id: 'lc-208',
      title: 'Implement Trie (Prefix Tree)',
      lcNumber: 208,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
      pattern: 'Trie Node Array Pointer',
      hint: 'TrieNode has children[26] and isTerminal boolean. Insert and search take O(L) time.',
      recommendedAfter: '01. L1 - Maps n Tries'
    },
    {
      id: 'lc-14',
      title: 'Longest Common Prefix',
      lcNumber: 14,
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/longest-common-prefix/',
      pattern: 'Trie Single Child Traversal',
      hint: 'Traverse root down while childCount == 1 and !isTerminal.',
      recommendedAfter: '02. L2 - Maps n Tries'
    }
  ],
  'mod-dynamic-programming': [
    {
      id: 'lc-198',
      title: 'House Robber',
      lcNumber: 198,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/house-robber/',
      pattern: '1D DP Include/Exclude',
      hint: 'dp[i] = max(nums[i] + dp[i-2], dp[i-1]). Optimize to 2 variables.',
      recommendedAfter: '01. L1 - Dynamic Programming'
    },
    {
      id: 'lc-300',
      title: 'Longest Increasing Subsequence',
      lcNumber: 300,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
      pattern: 'Binary Search + Patience Sorting',
      hint: 'Maintain vector tails: if x > tails.back() push; else overwrite lower_bound with x. O(N log N).',
      recommendedAfter: '03. L3 - Dynamic Programming'
    },
    {
      id: 'lc-1143',
      title: 'Longest Common Subsequence',
      lcNumber: 1143,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/longest-common-subsequence/',
      pattern: '2D DP Matrix',
      hint: 'If s1[i] == s2[j]: 1 + dp[i-1][j-1]; else max(dp[i-1][j], dp[i][j-1]).',
      recommendedAfter: '05. L5 - Dynamic Programming'
    },
    {
      id: 'lc-72',
      title: 'Edit Distance',
      lcNumber: 72,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/edit-distance/',
      pattern: 'Insert / Delete / Replace DP',
      hint: 'If mismatch: 1 + min({insert: dp[i][j-1], delete: dp[i-1][j], replace: dp[i-1][j-1]}).',
      recommendedAfter: '07. L7 - Dynamic Programming'
    }
  ],
  'mod-graphs': [
    {
      id: 'lc-200',
      title: 'Number of Islands',
      lcNumber: 200,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/number-of-islands/',
      pattern: 'Connected Components (BFS/DFS)',
      hint: 'When grid[r][c] == "1", trigger BFS/DFS to sink the entire island to "0".',
      recommendedAfter: '02. L2 - Graphs'
    },
    {
      id: 'lc-207',
      title: 'Course Schedule (Topological Sort)',
      lcNumber: 207,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/course-schedule/',
      pattern: "Kahn's BFS (Indegree)",
      hint: 'Calculate indegrees. Push 0-indegree nodes to queue. If processed == numCourses, valid.',
      recommendedAfter: '05. L5 - Graphs'
    },
    {
      id: 'lc-743',
      title: 'Network Delay Time (Dijkstra)',
      lcNumber: 743,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/network-delay-time/',
      pattern: "Dijkstra's Min-Heap",
      hint: 'Min-heap priority_queue<pair<dist, node>>. Relax adjacent edges: dist[u] + wt < dist[v].',
      recommendedAfter: '07. L7 - Graphs'
    },
    {
      id: 'lc-684',
      title: 'Redundant Connection (DSU)',
      lcNumber: 684,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/redundant-connection/',
      pattern: 'Disjoint Set Union (Cycle)',
      hint: 'If findParent(u) == findParent(v), edge (u, v) creates a cycle and is redundant.',
      recommendedAfter: '11. Kruskal\'s Algorithm [MST]'
    }
  ],
  'mod-bonus-module': [
    {
      id: 'lc-3',
      title: 'Longest Substring Without Repeating Characters',
      lcNumber: 3,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      pattern: 'Sliding Window (Hash Map)',
      hint: 'Maintain left pointer: when duplicate seen, advance left to lastSeen[ch] + 1.',
      recommendedAfter: '02. Sliding Window Session'
    },
    {
      id: 'lc-55',
      title: 'Jump Game',
      lcNumber: 55,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/jump-game/',
      pattern: 'Greedy Reachable Index',
      hint: 'Track maxReach = max(maxReach, i + nums[i]). If i > maxReach return false.',
      recommendedAfter: '01. Greedy Algorithm Session'
    }
  ],
  'mod-extra-leetcode-problems': [
    {
      id: 'lc-179-extra',
      title: 'Largest Number',
      lcNumber: 179,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/largest-number/',
      pattern: 'Custom String Comparator',
      hint: 'Compare a+b vs b+a in custom string sorting.',
      recommendedAfter: '02. LC 179 - Largest Number'
    },
    {
      id: 'lc-539-extra',
      title: 'Minimum Time Difference',
      lcNumber: 539,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/minimum-time-difference/',
      pattern: 'Sorting Circular Distance',
      hint: 'Convert all times to minutes, sort, compare adjacent and circular 1440 wrap.',
      recommendedAfter: '01. Minimum Time Difference'
    },
    {
      id: 'lc-6-extra',
      title: 'Zigzag Conversion',
      lcNumber: 6,
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/zigzag-conversion/',
      pattern: 'Simulation / Direction Vector',
      hint: 'Simulate row traversal with direction toggle (step = 1 or -1) at boundaries.',
      recommendedAfter: '03. LC 6 - Zigzag Conversion'
    }
  ]
};

// Helper to get problems for a module or specific lesson
export function getProblemsForModule(moduleId) {
  return practiceProblemsDatabase[moduleId] || [];
}

export function getAllPracticeProblems() {
  const all = [];
  for (const [modId, problems] of Object.entries(practiceProblemsDatabase)) {
    problems.forEach(p => all.push({ ...p, moduleId: modId }));
  }
  return all;
}
