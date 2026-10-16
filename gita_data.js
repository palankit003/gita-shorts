// Bhagavad Gita Chapter 12 Shlokas with Individual Audios & Exact Timings
const GITA_DATA = [
  {
    "num": 1,
    "speaker": "अर्जुन उवाच",
    "sanskrit": [
      "एवं सततयुक्ता ये भक्तास्त्वां पर्युपासते ।",
      "ये चाप्यक्षरमव्यक्तं तेषां के योगवित्तमाः ॥ १ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_01_sanskrit.mp3",
      "recit": "audio/shloka_01_recit.mp3",
      "full": "audio/shloka_01_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": [
          0.09,
          3.75
        ],
        "line1": [
          4.66,
          13.26
        ],
        "line2": [
          13.75,
          22.16
        ]
      },
      "recit": {
        "speaker": [
          0.02,
          0.95
        ],
        "line1": [
          2.14,
          5.2
        ],
        "line2": [
          6.29,
          9.68
        ]
      }
    }
  },
  {
    "num": 2,
    "speaker": "श्रीभगवानुवाच",
    "sanskrit": [
      "मय्यावेश्य मनो ये मां नित्ययुक्ता उपासते ।",
      "श्रद्धया परयोपेतास्ते मे युक्ततमा मताः ॥ २ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_02_sanskrit.mp3",
      "recit": "audio/shloka_02_recit.mp3",
      "full": "audio/shloka_02_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": [
          0.08,
          4.79
        ],
        "line1": [
          5.66,
          14.28
        ],
        "line2": [
          14.86,
          22.98
        ]
      },
      "recit": {
        "speaker": [
          0.02,
          1.29
        ],
        "line1": [
          2.5,
          5.58
        ],
        "line2": [
          6.71,
          10.06
        ]
      }
    }
  },
  {
    "num": 3,
    "speaker": null,
    "sanskrit": [
      "ये त्वक्षरमनिर्देश्यमव्यक्तं पर्युपासते ।",
      "सर्वत्रगमचिन्त्यं च कूटस्थमचलं ध्रुवम् ॥ ३ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_03_sanskrit.mp3",
      "recit": "audio/shloka_03_recit.mp3",
      "full": "audio/shloka_03_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          7.64
        ],
        "line2": [
          8.22,
          12.2
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          2.89
        ],
        "line2": [
          4.02,
          7.49
        ]
      }
    }
  },
  {
    "num": 4,
    "speaker": null,
    "sanskrit": [
      "संनियम्येन्द्रियग्रामं सर्वत्र समबुद्धयः ।",
      "ते प्राप्नुवन्ति मामेव सर्वभूतहिते रताः ॥ ४ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_04_sanskrit.mp3",
      "recit": "audio/shloka_04_recit.mp3",
      "full": "audio/shloka_04_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.73
        ],
        "line2": [
          9.18,
          12.06
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.03,
          2.86
        ],
        "line2": [
          4.04,
          7.4
        ]
      }
    }
  },
  {
    "num": 5,
    "speaker": null,
    "sanskrit": [
      "क्लेशोऽधिकतरस्तेषामव्यक्तासक्तचेतसाम् ।",
      "अव्यक्ता हि गतिर्दुःखं देहवद्भिरवाप्यते ॥ ५ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_05_sanskrit.mp3",
      "recit": "audio/shloka_05_recit.mp3",
      "full": "audio/shloka_05_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.48
        ],
        "line2": [
          9.11,
          17.85
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          3.0
        ],
        "line2": [
          4.17,
          7.59
        ]
      }
    }
  },
  {
    "num": 6,
    "speaker": null,
    "sanskrit": [
      "ये तु सर्वाणि कर्माणि मयि संन्यस्य मत्पराः ।",
      "अनन्येनैव योगेन मां ध्यायन्त उपासते ॥ ६ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_06_sanskrit.mp3",
      "recit": "audio/shloka_06_recit.mp3",
      "full": "audio/shloka_06_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.47
        ],
        "line2": [
          9.37,
          18.32
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          3.21
        ],
        "line2": [
          4.39,
          7.35
        ]
      }
    }
  },
  {
    "num": 7,
    "speaker": null,
    "sanskrit": [
      "तेषामहं समुद्धर्ता मृत्युसंसारसागरात् ।",
      "भवामि नचिरात्पार्थ मय्यावेशितचेतसाम् ॥ ७ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_07_sanskrit.mp3",
      "recit": "audio/shloka_07_recit.mp3",
      "full": "audio/shloka_07_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.63
        ],
        "line2": [
          9.26,
          18.34
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.03,
          3.05
        ],
        "line2": [
          4.34,
          7.55
        ]
      }
    }
  },
  {
    "num": 8,
    "speaker": null,
    "sanskrit": [
      "मय्येव मन आधत्स्व मयि बुद्धिं निवेशय ।",
      "निवसिष्यसि मय्येव अत ऊर्ध्वं न संशयः ॥ ८ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_08_sanskrit.mp3",
      "recit": "audio/shloka_08_recit.mp3",
      "full": "audio/shloka_08_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.59
        ],
        "line2": [
          9.21,
          17.37
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          2.62
        ],
        "line2": [
          3.76,
          6.86
        ]
      }
    }
  },
  {
    "num": 9,
    "speaker": null,
    "sanskrit": [
      "अथ चित्तं समाधातुं न शक्नोषि मयि स्थिरम् ।",
      "अभ्यासयोगेन ततो मामिच्छाप्तुं धनञ्जय ॥ ९ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_09_sanskrit.mp3",
      "recit": "audio/shloka_09_recit.mp3",
      "full": "audio/shloka_09_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.04
        ],
        "line2": [
          8.65,
          17.64
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          3.21
        ],
        "line2": [
          4.33,
          7.43
        ]
      }
    }
  },
  {
    "num": 10,
    "speaker": null,
    "sanskrit": [
      "अभ्यासेऽप्यसमर्थोऽसि मत्कर्मपरमो भव ।",
      "मदर्थमपि कर्माणि कुर्वन्सिद्धिमवाप्स्यसि ॥ १० ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_10_sanskrit.mp3",
      "recit": "audio/shloka_10_recit.mp3",
      "full": "audio/shloka_10_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.36
        ],
        "line2": [
          9.01,
          17.57
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          2.68
        ],
        "line2": [
          3.98,
          7.43
        ]
      }
    }
  },
  {
    "num": 11,
    "speaker": null,
    "sanskrit": [
      "अथैतदप्यशक्तोऽसि कर्तुं मद्योगमाश्रितः ।",
      "सर्वकर्मफलत्यागं ततः कुरु यतात्मवान् ॥ ११ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_11_sanskrit.mp3",
      "recit": "audio/shloka_11_recit.mp3",
      "full": "audio/shloka_11_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.54
        ],
        "line2": [
          9.27,
          18.35
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          2.97
        ],
        "line2": [
          4.15,
          7.55
        ]
      }
    }
  },
  {
    "num": 12,
    "speaker": null,
    "sanskrit": [
      "श्रेयो हि ज्ञानमभ्यासाज्ज्ञानाद्ध्यानं विशिष्यते ।",
      "ध्यानात्कर्मफलत्यागस्त्यागाच्छान्तिरनन्तरम् ॥ १२ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_12_sanskrit.mp3",
      "recit": "audio/shloka_12_recit.mp3",
      "full": "audio/shloka_12_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.06,
          8.54
        ],
        "line2": [
          9.12,
          18.18
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          3.48
        ],
        "line2": [
          4.55,
          8.04
        ]
      }
    }
  },
  {
    "num": 13,
    "speaker": null,
    "sanskrit": [
      "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च ।",
      "निर्ममो निरहङ्कारः समदुःखसुखः क्षमी ॥ १३ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_13_sanskrit.mp3",
      "recit": "audio/shloka_13_recit.mp3",
      "full": "audio/shloka_13_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          13.15
        ],
        "line2": [
          13.79,
          17.68
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          3.36
        ],
        "line2": [
          4.47,
          7.75
        ]
      }
    }
  },
  {
    "num": 14,
    "speaker": null,
    "sanskrit": [
      "सन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः ।",
      "मय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः ॥ १४ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_14_sanskrit.mp3",
      "recit": "audio/shloka_14_recit.mp3",
      "full": "audio/shloka_14_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.08
        ],
        "line2": [
          8.64,
          12.18
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          3.18
        ],
        "line2": [
          4.3,
          7.84
        ]
      }
    }
  },
  {
    "num": 15,
    "speaker": null,
    "sanskrit": [
      "यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः ।",
      "हर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः ॥ १५ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_15_sanskrit.mp3",
      "recit": "audio/shloka_15_recit.mp3",
      "full": "audio/shloka_15_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          9.7
        ],
        "line2": [
          10.22,
          23.22
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          3.19
        ],
        "line2": [
          4.39,
          8.26
        ]
      }
    }
  },
  {
    "num": 16,
    "speaker": null,
    "sanskrit": [
      "अनपेक्षः शुचिर्दक्ष उदासीनो गतव्यथः ।",
      "सर्वारम्भपरित्यागी यो मद्भक्तः स मे प्रियः ॥ १६ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_16_sanskrit.mp3",
      "recit": "audio/shloka_16_recit.mp3",
      "full": "audio/shloka_16_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.07,
          8.27
        ],
        "line2": [
          9.3,
          17.59
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          2.96
        ],
        "line2": [
          4.19,
          7.88
        ]
      }
    }
  },
  {
    "num": 17,
    "speaker": null,
    "sanskrit": [
      "यो न हृष्यति न द्वेष्टि न शोचति न काङ्क्षति ।",
      "शुभाशुभपरित्यागी भक्तिमान्यः स मे प्रियः ॥ १७ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_17_sanskrit.mp3",
      "recit": "audio/shloka_17_recit.mp3",
      "full": "audio/shloka_17_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.46
        ],
        "line2": [
          9.36,
          13.83
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          3.37
        ],
        "line2": [
          4.51,
          8.07
        ]
      }
    }
  },
  {
    "num": 18,
    "speaker": null,
    "sanskrit": [
      "समः शत्रौ च मित्रे च तथा मानापमानयोः ।",
      "शीतोष्णसुखदुःखेषु समः सङ्गविवर्जितः ॥ १८ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_18_sanskrit.mp3",
      "recit": "audio/shloka_18_recit.mp3",
      "full": "audio/shloka_18_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.1
        ],
        "line2": [
          8.66,
          12.18
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.04,
          3.24
        ],
        "line2": [
          4.46,
          8.15
        ]
      }
    }
  },
  {
    "num": 19,
    "speaker": null,
    "sanskrit": [
      "तुल्यनिन्दास्तुतिर्मौनी सन्तुष्टो येन केनचित् ।",
      "अनिकेतः स्थिरमतिर्भक्तिमान्मे प्रियो नरः ॥ १९ ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_19_sanskrit.mp3",
      "recit": "audio/shloka_19_recit.mp3",
      "full": "audio/shloka_19_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.21
        ],
        "line2": [
          9.18,
          17.47
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.04,
          3.16
        ],
        "line2": [
          4.49,
          7.88
        ]
      }
    }
  },
  {
    "num": 20,
    "speaker": null,
    "sanskrit": [
      "ये तु धर्म्यामृतमिदं यथोक्तं पर्युपासते ।",
      "श्रद्दधाना मत्परमा भक्तास्तेऽतीव मे प्रियाः ॥ २० ॥"
    ],
    "audio": {
      "sanskrit": "audio/shloka_20_sanskrit.mp3",
      "recit": "audio/shloka_20_recit.mp3",
      "full": "audio/shloka_20_full.mp3"
    },
    "timing": {
      "sanskrit": {
        "speaker": null,
        "line1": [
          0.05,
          8.47
        ],
        "line2": [
          9.26,
          19.42
        ]
      },
      "recit": {
        "speaker": null,
        "line1": [
          0.02,
          3.22
        ],
        "line2": [
          4.35,
          8.02
        ]
      }
    }
  }
];
