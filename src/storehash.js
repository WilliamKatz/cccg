import web3 from './web3';
//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0xfefebfbeb794581a3109b856b031f26d1521db19';
//use the ABI from your contract
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newProducerAddress",
				"type": "address"
			}
		],
		"name": "_approveNewProducerAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newRoasterAddress",
				"type": "address"
			}
		],
		"name": "_approveNewRoasterAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_farmName",
				"type": "string"
			},
			{
				"name": "_farmCountry",
				"type": "string"
			},
			{
				"name": "_coffeeDescription",
				"type": "string"
			},
			{
				"name": "_elevationMeters",
				"type": "uint16"
			},
			{
				"name": "_harvestedMMYY",
				"type": "uint16"
			},
			{
				"name": "_weightInGrams",
				"type": "uint32"
			},
			{
				"name": "_lotNumber",
				"type": "uint32"
			}
		],
		"name": "_createGreenCoffeeBeans",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_greenCoffeeDryingEndPhoto",
				"type": "string"
			}
		],
		"name": "_endGreenCoffeeDrying",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_roastId",
				"type": "uint256"
			}
		],
		"name": "_redeemRoastedCoffee",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_producerAddress",
				"type": "address"
			}
		],
		"name": "_revokeProducerApproval",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_roasterAddress",
				"type": "address"
			}
		],
		"name": "_revokeRoasterApproval",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_coffeeName",
				"type": "string"
			},
			{
				"name": "_roasterMachine",
				"type": "string"
			},
			{
				"name": "_roastDataOnIPFS",
				"type": "string"
			},
			{
				"name": "_preRoastWeightInGrams",
				"type": "uint32"
			},
			{
				"name": "_dateRoastedMMDDYY",
				"type": "uint32"
			},
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_preRoastPhoto",
				"type": "string"
			},
			{
				"name": "_postRoastPhoto",
				"type": "string"
			}
		],
		"name": "_roastCoffeeBeans",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_proofOfDeliveryPhoto",
				"type": "string"
			}
		],
		"name": "_shipmentReceivedByRoaster",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_greenCoffeeDryingStartPhoto",
				"type": "string"
			}
		],
		"name": "_startGreenCoffeeDrying",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_shipmentTrackingPhoto",
				"type": "string"
			}
		],
		"name": "_submitCompletedShipmentTracking",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_roastId",
				"type": "uint256"
			},
			{
				"name": "_reviewHash",
				"type": "string"
			}
		],
		"name": "_submitConsumerReview",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_greenCoffeeAfterPulpingPhoto",
				"type": "string"
			}
		],
		"name": "_submitGreenCoffeeAfterPulpingPhoto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_greenProcessingInvoiceHash",
				"type": "string"
			}
		],
		"name": "_submitGreenProcessingInvoice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_greenShippingInvoiceHash",
				"type": "string"
			}
		],
		"name": "_submitGreenShippingInvoiceHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_greenCoffeeSortingPhoto",
				"type": "string"
			}
		],
		"name": "_submitGreenSortingPhoto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_harvestedCherryPhoto",
				"type": "string"
			}
		],
		"name": "_submitHarvestedCherryPhoto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_hulledGreenCoffeePhoto",
				"type": "string"
			}
		],
		"name": "_submitHulledGreenCoffeePhoto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_packagedGreenCoffeePhoto",
				"type": "string"
			}
		],
		"name": "_submitPackagedGreenCoffeePhoto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_identityHash",
				"type": "string"
			}
		],
		"name": "_submitProducerProofOfIdentity",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "eventName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "roasterAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "roasterIdentityHash",
				"type": "string"
			}
		],
		"name": "NewRoasterProofOfIdentity",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "eventName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "coffeeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "farmName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "farmCountry",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "coffeeDescription",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "producerAddress",
				"type": "address"
			}
		],
		"name": "NewGreenCoffeeBeans",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "eventName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "producerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "identityHash",
				"type": "string"
			}
		],
		"name": "NewProducerProofOfIdentity",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "roasterAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "approvalStatus",
				"type": "string"
			}
		],
		"name": "NewRoasterApproval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "producerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "appovalStatus",
				"type": "string"
			}
		],
		"name": "NewProducerApproval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_approved",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "coffeeTokenType",
				"type": "string"
			}
		],
		"name": "ApprovalRoasted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "coffeeTokenType",
				"type": "string"
			}
		],
		"name": "TransferRoasted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_approved",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "coffeeTokenType",
				"type": "string"
			}
		],
		"name": "ApprovalGreen",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "coffeeTokenType",
				"type": "string"
			}
		],
		"name": "TransferGreen",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_proofOfPaymentForGreen",
				"type": "string"
			}
		],
		"name": "_submitProofOfPaymentForGreen",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "eventName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "reviewer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "roastId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "IPFSreviewHash",
				"type": "string"
			}
		],
		"name": "NewRoastedConsumerReview",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "eventName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "greenCoffeeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "qualityAnalysisHash",
				"type": "string"
			}
		],
		"name": "NewQualityAnalysis",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "eventName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "roastCoffeeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "greenCoffeeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "roasterAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "preRoastPhoto",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "roastDataHash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "postRoastPhoto",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "countryOfOrigin",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "farmName",
				"type": "string"
			}
		],
		"name": "NewCoffeeRoasted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "eventName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "coffeeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "roasterAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "producerAddress",
				"type": "address"
			}
		],
		"name": "GreenCoffeeDelivered",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			},
			{
				"name": "_qualityAnalysisHash",
				"type": "string"
			}
		],
		"name": "_submitQualityAnalysisHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_roasterProofOfIdentity",
				"type": "string"
			}
		],
		"name": "_submitRoasterProofOfIdentity",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "approveGreen",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_roastId",
				"type": "uint256"
			}
		],
		"name": "approveRoasted",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "takeOwnershipGreen",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_roastId",
				"type": "uint256"
			}
		],
		"name": "takeOwnershipRoasted",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "transferGreen",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_roastId",
				"type": "uint256"
			}
		],
		"name": "transferRoasted",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "amountUnroasted",
		"outputs": [
			{
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "approvedProducerRegistry",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "approvedRoasterRegistry",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOfGreen",
		"outputs": [
			{
				"name": "_balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOfRoasted",
		"outputs": [
			{
				"name": "_balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "cherriesArriveAtMillPhoto",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "coffeeElevation",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "consumerReview",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "countryOfOrigin",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dateRoastedMMDDYY",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dryEndGreenCoffeePhoto",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dryStartGreenCoffeePhoto",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "farmName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "getAmountUnroasted",
		"outputs": [
			{
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_producerAddress",
				"type": "address"
			}
		],
		"name": "getCoffeeByProducer",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "getCoffeeElevation",
		"outputs": [
			{
				"name": "_coffeeElevation",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "getCountryOfOrigin",
		"outputs": [
			{
				"name": "_countryOfOrigin",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "getFarmName",
		"outputs": [
			{
				"name": "_farmName",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "getGreenCoffeeDescription",
		"outputs": [
			{
				"name": "_greenCoffeeDescription",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "getHarvestDate",
		"outputs": [
			{
				"name": "_harvestedMMYY",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getProducerOf",
		"outputs": [
			{
				"name": "_producerAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_producerAddress",
				"type": "address"
			}
		],
		"name": "getProofOfIdentity",
		"outputs": [
			{
				"name": "_identityHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "getProofOfPaymentForGreen",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "getQualityAnalysisHash",
		"outputs": [
			{
				"name": "_qualityAnalysisHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_roastId",
				"type": "uint256"
			}
		],
		"name": "getRoastedCoffeeCountry",
		"outputs": [
			{
				"name": "_roastedCoffeeCountry",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_roastId",
				"type": "uint256"
			}
		],
		"name": "getRoastedCoffeeFarm",
		"outputs": [
			{
				"name": "_roastedCoffeeFarm",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_roastId",
				"type": "uint256"
			}
		],
		"name": "getRoastedCoffeeName",
		"outputs": [
			{
				"name": "_roastedCoffeeName",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "greenBeanOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "greenCoffeeAfterPulping",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "greenCoffeeApprovals",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "greenCoffeeBeans",
		"outputs": [
			{
				"name": "farmName",
				"type": "string"
			},
			{
				"name": "countryOfOrigin",
				"type": "string"
			},
			{
				"name": "coffeeDescription",
				"type": "string"
			},
			{
				"name": "elevationMeters",
				"type": "uint16"
			},
			{
				"name": "harvestedMMYY",
				"type": "uint16"
			},
			{
				"name": "weightInGrams",
				"type": "uint32"
			},
			{
				"name": "lotNumber",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "greenCoffeeDescription",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "greenCoffeeProcessingInvoice",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "greenCoffeeShippingInvoice",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "greenToRoastedIdList",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "harvestedCherryPhoto",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "harvestedMMYY",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "hulledGreenCoffeePhoto",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lotNumber",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "ownerGreenBeanCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_greenCoffeeId",
				"type": "uint256"
			}
		],
		"name": "ownerOfGreen",
		"outputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_roastId",
				"type": "uint256"
			}
		],
		"name": "ownerOfRoasted",
		"outputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "ownerRoastedCoffeeCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "packagedGreenCoffeePhoto",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "postRoastPhoto",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "preRoastPhoto",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "producedBy",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "producerGreenBeanList",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proofOfDeliveryPhoto",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "proofOfIdentityHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proofOfPaymentForGreen",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "qualityAnalysisHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "receivedByRoaster",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roastDataOnIPFS",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roastedBy",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roastedCoffeeApprovals",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roastedCoffeeBeans",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "roasterMachine",
				"type": "string"
			},
			{
				"name": "roastDataOnIPFS",
				"type": "string"
			},
			{
				"name": "preRoastWeightInGrams",
				"type": "uint32"
			},
			{
				"name": "dateRoastedMMDDYY",
				"type": "uint32"
			},
			{
				"name": "greenCoffeeId",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roastedCoffeeName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roastedCoffeeOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roastedCoffeeRedeemed",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roastedToGreenId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "roasterProofOfIdentityHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "shipmentTrackingPhoto",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sortGreenCoffeePhoto",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
export default new web3.eth.Contract(abi, address);
