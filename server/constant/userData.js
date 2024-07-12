const users = [
    { name: "Nick Francis", email: "Nick@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/42e9/4b92/1ece51ef671cfad39c7e84938fed6fe3?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZxBETD8gtiwP1Xg-r5bkqoecGsIR~OKlXFCJtw08njSQ9NE8G9BemGRCuquy8ZdXMbiffSl5sEZEfyJmw6kUcm-uyOpRGNn396RBKIWq0Oq7g8459kO~Cjk0dYOfuu78kjNYnmDBx-uJZ6bPZwNAzUFXgshxXyMQNyOXbUBD4wtcPgSk1Tqoebrw-XskSTDy9JoiTJdtDXWoJ19PJbgWZqI4aEJkzhGd~iYqCE540Nh8MOKEiJGkWjRFog-OBzDpJkkjRsNC80FGuzG1wB9coE3VSH5ehdkpVYXsWvDOwB0qQRixS6Yi~itwOZF0o3HOG~NJ~VhltztU5gpOUQij9g__"},
    { name: "Denny Swindle", email: "Denny@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DMZhEydpsmMXZwbOXMAoA6D9qwCxUxUGqKo-blIeIiQJ4J8NENfvm7LUg3iBTBD2S4MeGzdSQEQz5NosryipQ4dGkfqlqfZvl5eeev~hdfPDgwgwcWMekBPWk9V3vrq5l~E5a4uob9cXboouVEw3JZUBjJ89ILceqYS2OcxngbRqb2e21NJT1h72uEpochwio5lAs-MtKqZ2brRqxYuBTS~0mdklqt~qbqEUVwDalFTDl3808Qrx~iF2Uvx8hYLD-CxOZJOzsIo0UZWj01TpXPl3VO1U~CFwYJvsr5CXtVxO0KAs987FkjF2HVBwu3luSB37gXC7q8Gvt276EFG8EA__" },
    { name: "Jared McDaniel", email: "Jared@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/9793/6dd6/d457a552a4b16198997e197dc94e1700?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gX3wG97LGdh7xESHCBUaxvVZXteyZ7LNm3KBJ8yGIgNvuEaX935YonTTKqY83lbuGj4zZ93EifSMqG-h672zBgVlQ3ybvRYVSvKq~UFyWdu9dbJXfEFeArsp6XCNxCOctrYxa9kDjA1C1YlILz8vMftbBhfCATdkVKIqkQ7OdZlklH57zMiPGIwtj47LV-i73jcN-CTl01Gj-GPPEqgyZPSnSqsWF9fThSHU3g1OoudqDyAEccRHIAbvKXYUaZm8h7Ozmjmd61BI-cfm~D7YqrUS7Cp-RwGYL6LAz7DZ1wZKqHYRf8V9A1uPABobFkwj-YxQnXTWVSBhEm7YZI5c0g__" },
    { name: "Andrea Kayal", email: "Andrea@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/54b3/2e02/0477de3f340618e1cf927540cae6990e?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SFT-YWysbbIGZ6AVnP0a~Q15mNVhVgS4JNL2eiwZixe2uzlRN50tk1PPRXoc9G5L2ghHmt32WMDvWTYzBN3l9uhkX7jfBr2i~05zfSIBRlBkSq2TpuQ32Eri7fp1QqicjYd9MuqrneSh-aQ5qT7pdM08XLrt-N8f2Dgp6SPpXaaD5V3c0Nxjb7ah8~MPsm4r3B9WIPsWHRSYnPKwsyE7Z2XfUOtVW-IhyrAe7r0YBe6UAD~-MmTzty-IaM0CwASKYCJQjqdhdCG~UWSVuoP1MaOuaKGP9VlZHrPwMBiVrIBMFFWSfhtEISmF7TCk4lIL0aNPOZ5KnaayqTK8dAdGsg__" },
    { name: "Shawna Fisher", email: "Shawna@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/fac3/6f28/1b1020a0c09cb231b931f6ab6b3e7365?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iboP~shtLd92PRTS~8wyUgalo~ql5ne2F6KkXUdIvhrKFnLccZcyAJ5aZ2KmJt4Tz4kLqvOftEzTnOZKeS6vHLjwtAKc0vmR9P31HvlacAQ4gkAiukPAwk9ChqTJ8giIhEOXLKOSP19aosJWdGxUc7zqUt23HoaT5yNEGzL95eRtH8HCFUV29Wn5QgKGh8J8UF3abtsU81Fb5yKBEYRIWHZhu8miJFCex3pNDNpC6jYfPau8ECv1H5slsfR6908vXkfPRMT~~0L2bZex8e8KZcgU0mibkCoQU80Xp81h0Y1WnEVg7i9kSXKf4J2tle~H1Eenb6zYE8ud9Qyv-qbz3w__"},
    { name: "Kristen Bryant Smith", email: "Kristen@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/e8d3/0826/7b032c2c0fa0b361aac042458afab706?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VQnHVUT9hbstLu2ktVk5vdGF2gX2mG56ZcQqGcRgUkS6YY~l4GqnATFQobmbYDtXyUPlAuFLRgyNKV8pkQ6v0EywwflLXqDfgAPv-3HN~~vlb3h90mLgvRPcbWg2ukkOJjsBK42t6ObxQosmQKMUzOqH2lepQJrIcyjxcXnF3o39mCRq~eXZltcaQEWYhAtrzKzh6DMvzoDcyt-wYMTOq6aThXj5mREG428j~Wiabm6az5d~rBhFFp2VHZa~gNgYYbx26Th9vtOiGCFLSM~xe1FNTEgEGGGWi6zcj6rTjcdPIGHoL3lTCasaiabUNkBn-r1GdqjZWs6zsHS9zl7KOg__" },
    { name: "Leah Knobler", email: "Leahknobler@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/7004/0f90/2dedd8f0c01a54454ba45d3bc09fab2a?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Rjmfryk8DBjOxwZdZr9ZIffY-U9LoSvDyT1jaqd6jIVen1-bN~g2tZKnkbxRX6yvr5Vj2ISwd191-HDC8Peaj27-0MBc6tdrcvSRJieM85C3Ydqmvx7IiY3LpNucYChayA9nXxs7qW-3T5HeYPXZa0xjoZwevAZiiEjKyzEiUh6eg9KSWYvma1NGPmO7iJl5o6-j3Cvbhh5GkkWwhJipaDwl5ij-o6s~QEWECCQUceNfCboBBCJqjjutRTpGUEOOX9IAp~JKr8hFd6fgfPbQ0xTCMeiC6LiYldFNRcMpyjrkjCjgQGqV7wQrLg46rL01wPKPmCJoLXvZUbfGQvDO-Q__" },
    { name: "Eli Overbey", email: "Elioverbey@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/3652/e3b6/fe30b9267939d05e4636fad64ca49d1e?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TeCBM5Sd~VWDqOu9GxAeM65j3sEYbKyvV7y0lw7N8bX589onlDt7zK8uLbjaZ4hNcAbFJWJQgL47D2G87RRTVG35hvUB031ARHQ44EGxm3yq-ZT7tSRrSzLjsbKMUvNZr9yb9lN2fyb8DZhxJ19dFZcgohBAXV4KG4CGnf6wLeRjB9CcgALZ3VZfUtQgImrOXTtdZVyHWQtHjKFmo7Hx7zTb5cYOximqaLkYxEPhk5ghC25q1wLPT59~2RA4Jb5PY5I77cOFx2vlv2NhcfleAYm2E5wZF5PEdicnpV161auCO0tvDUdnLw4nhGzj5jMj~-J~BxkM4ZCF1vxz5FuPMQ__" },
    { name: "Denny Swindle", email: "Denny2@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DMZhEydpsmMXZwbOXMAoA6D9qwCxUxUGqKo-blIeIiQJ4J8NENfvm7LUg3iBTBD2S4MeGzdSQEQz5NosryipQ4dGkfqlqfZvl5eeev~hdfPDgwgwcWMekBPWk9V3vrq5l~E5a4uob9cXboouVEw3JZUBjJ89ILceqYS2OcxngbRqb2e21NJT1h72uEpochwio5lAs-MtKqZ2brRqxYuBTS~0mdklqt~qbqEUVwDalFTDl3808Qrx~iF2Uvx8hYLD-CxOZJOzsIo0UZWj01TpXPl3VO1U~CFwYJvsr5CXtVxO0KAs987FkjF2HVBwu3luSB37gXC7q8Gvt276EFG8EA__" },
    { name: "Andrea Kayal", email: "Andrea2@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/54b3/2e02/0477de3f340618e1cf927540cae6990e?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SFT-YWysbbIGZ6AVnP0a~Q15mNVhVgS4JNL2eiwZixe2uzlRN50tk1PPRXoc9G5L2ghHmt32WMDvWTYzBN3l9uhkX7jfBr2i~05zfSIBRlBkSq2TpuQ32Eri7fp1QqicjYd9MuqrneSh-aQ5qT7pdM08XLrt-N8f2Dgp6SPpXaaD5V3c0Nxjb7ah8~MPsm4r3B9WIPsWHRSYnPKwsyE7Z2XfUOtVW-IhyrAe7r0YBe6UAD~-MmTzty-IaM0CwASKYCJQjqdhdCG~UWSVuoP1MaOuaKGP9VlZHrPwMBiVrIBMFFWSfhtEISmF7TCk4lIL0aNPOZ5KnaayqTK8dAdGsg__" },
    { name: "Leah Knobler", email: "Leahknobler2@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/7004/0f90/2dedd8f0c01a54454ba45d3bc09fab2a?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Rjmfryk8DBjOxwZdZr9ZIffY-U9LoSvDyT1jaqd6jIVen1-bN~g2tZKnkbxRX6yvr5Vj2ISwd191-HDC8Peaj27-0MBc6tdrcvSRJieM85C3Ydqmvx7IiY3LpNucYChayA9nXxs7qW-3T5HeYPXZa0xjoZwevAZiiEjKyzEiUh6eg9KSWYvma1NGPmO7iJl5o6-j3Cvbhh5GkkWwhJipaDwl5ij-o6s~QEWECCQUceNfCboBBCJqjjutRTpGUEOOX9IAp~JKr8hFd6fgfPbQ0xTCMeiC6LiYldFNRcMpyjrkjCjgQGqV7wQrLg46rL01wPKPmCJoLXvZUbfGQvDO-Q__" },
    { name: "Kristen Bryant Smith", email: "Kristen2@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/e8d3/0826/7b032c2c0fa0b361aac042458afab706?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VQnHVUT9hbstLu2ktVk5vdGF2gX2mG56ZcQqGcRgUkS6YY~l4GqnATFQobmbYDtXyUPlAuFLRgyNKV8pkQ6v0EywwflLXqDfgAPv-3HN~~vlb3h90mLgvRPcbWg2ukkOJjsBK42t6ObxQosmQKMUzOqH2lepQJrIcyjxcXnF3o39mCRq~eXZltcaQEWYhAtrzKzh6DMvzoDcyt-wYMTOq6aThXj5mREG428j~Wiabm6az5d~rBhFFp2VHZa~gNgYYbx26Th9vtOiGCFLSM~xe1FNTEgEGGGWi6zcj6rTjcdPIGHoL3lTCasaiabUNkBn-r1GdqjZWs6zsHS9zl7KOg__" },
    { name: "Eli Overbey", email: "Elioverbey2@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/3652/e3b6/fe30b9267939d05e4636fad64ca49d1e?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TeCBM5Sd~VWDqOu9GxAeM65j3sEYbKyvV7y0lw7N8bX589onlDt7zK8uLbjaZ4hNcAbFJWJQgL47D2G87RRTVG35hvUB031ARHQ44EGxm3yq-ZT7tSRrSzLjsbKMUvNZr9yb9lN2fyb8DZhxJ19dFZcgohBAXV4KG4CGnf6wLeRjB9CcgALZ3VZfUtQgImrOXTtdZVyHWQtHjKFmo7Hx7zTb5cYOximqaLkYxEPhk5ghC25q1wLPT59~2RA4Jb5PY5I77cOFx2vlv2NhcfleAYm2E5wZF5PEdicnpV161auCO0tvDUdnLw4nhGzj5jMj~-J~BxkM4ZCF1vxz5FuPMQ__" },
    { name: "Shawna Fisher", email: "Shawna2@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/fac3/6f28/1b1020a0c09cb231b931f6ab6b3e7365?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iboP~shtLd92PRTS~8wyUgalo~ql5ne2F6KkXUdIvhrKFnLccZcyAJ5aZ2KmJt4Tz4kLqvOftEzTnOZKeS6vHLjwtAKc0vmR9P31HvlacAQ4gkAiukPAwk9ChqTJ8giIhEOXLKOSP19aosJWdGxUc7zqUt23HoaT5yNEGzL95eRtH8HCFUV29Wn5QgKGh8J8UF3abtsU81Fb5yKBEYRIWHZhu8miJFCex3pNDNpC6jYfPau8ECv1H5slsfR6908vXkfPRMT~~0L2bZex8e8KZcgU0mibkCoQU80Xp81h0Y1WnEVg7i9kSXKf4J2tle~H1Eenb6zYE8ud9Qyv-qbz3w__"},
    { name: "Nick Francis", email: "Nick2@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/42e9/4b92/1ece51ef671cfad39c7e84938fed6fe3?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZxBETD8gtiwP1Xg-r5bkqoecGsIR~OKlXFCJtw08njSQ9NE8G9BemGRCuquy8ZdXMbiffSl5sEZEfyJmw6kUcm-uyOpRGNn396RBKIWq0Oq7g8459kO~Cjk0dYOfuu78kjNYnmDBx-uJZ6bPZwNAzUFXgshxXyMQNyOXbUBD4wtcPgSk1Tqoebrw-XskSTDy9JoiTJdtDXWoJ19PJbgWZqI4aEJkzhGd~iYqCE540Nh8MOKEiJGkWjRFog-OBzDpJkkjRsNC80FGuzG1wB9coE3VSH5ehdkpVYXsWvDOwB0qQRixS6Yi~itwOZF0o3HOG~NJ~VhltztU5gpOUQij9g__"},
    { name: "Jared McDaniel", email: "Jared2@gmail.com", imgUrl : "https://s3-alpha-sig.figma.com/img/9793/6dd6/d457a552a4b16198997e197dc94e1700?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gX3wG97LGdh7xESHCBUaxvVZXteyZ7LNm3KBJ8yGIgNvuEaX935YonTTKqY83lbuGj4zZ93EifSMqG-h672zBgVlQ3ybvRYVSvKq~UFyWdu9dbJXfEFeArsp6XCNxCOctrYxa9kDjA1C1YlILz8vMftbBhfCATdkVKIqkQ7OdZlklH57zMiPGIwtj47LV-i73jcN-CTl01Gj-GPPEqgyZPSnSqsWF9fThSHU3g1OoudqDyAEccRHIAbvKXYUaZm8h7Ozmjmd61BI-cfm~D7YqrUS7Cp-RwGYL6LAz7DZ1wZKqHYRf8V9A1uPABobFkwj-YxQnXTWVSBhEm7YZI5c0g__" },
];


module.exports = users;