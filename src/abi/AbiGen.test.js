import React from 'react';
import AbiGen from './AbiGen';
import contract from 'truffle-contract';

import { expect } from 'chai';

import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


it('can translate TruffleContract to local state object', () => {
    const wrapper = shallow(<AbiGen />);
    const inst = wrapper.instance();
    const truffleContract = getAbiJson('Entity');
    const abiFieldsData = inst.genContractForState(truffleContract);
    expect(abiFieldsData.abi[0].inputs[0]).to.have.property('value');
});

 
it('adds a value key for the objects on the AbiFields of the state', () => {
    const wrapper = shallow(<AbiGen />);
    const inst = wrapper.instance();

    const abiDataFromTruffleJson = [
        {
            'constant': false,
            'inputs': [
                {
                    'name': '_offChainLocation',
                    'type': 'string'
                }
            ],
            'name': 'setOffChainLocation',
            'outputs': [

            ],
            'payable': false,
            'type': 'function'
        },
        {
            'constant': true,
            'inputs': [
                {
                    'name': '_verifier',
                    'type': 'address'
                }
            ],
            'name': 'wasVerifiedBy',
            'outputs': [
                {
                    'name': 'wasVerified',
                    'type': 'bool'
                }
            ],
            'payable': false,
            'type': 'function'
        }
    ];

    const fieldsWithValueKey = inst.addValueKeyForAbiElements(abiDataFromTruffleJson);
    expect(fieldsWithValueKey[0]).not.to.have.property('value');
    expect(fieldsWithValueKey[0].inputs[0]).to.have.property('value');

    expect(fieldsWithValueKey[1].inputs[0]).to.have.property('value');
    expect(fieldsWithValueKey[1].outputs[0]).to.have.property('value');
});


const ContractData = {
    "contractName":"Entity",
    "abi":[
       {
          "constant":false,
          "inputs":[
             {
                "name":"_offChainLocation",
                "type":"string"
             }
          ],
          "name":"setOffChainLocation",
          "outputs":[
 
          ],
          "payable":false,
          "type":"function"
       },
       {
          "constant":true,
          "inputs":[
             {
                "name":"_verifier",
                "type":"address"
             }
          ],
          "name":"wasVerifiedBy",
          "outputs":[
             {
                "name":"wasVerified",
                "type":"bool"
             }
          ],
          "payable":false,
          "type":"function"
       },
       {
          "constant":false,
          "inputs":[
 
          ],
          "name":"getOffChainLocation",
          "outputs":[
             {
                "name":"",
                "type":"string"
             }
          ],
          "payable":false,
          "type":"function"
       },
       {
          "constant":false,
          "inputs":[
 
          ],
          "name":"getRootHash",
          "outputs":[
             {
                "name":"",
                "type":"string"
             }
          ],
          "payable":false,
          "type":"function"
       },
       {
          "constant":true,
          "inputs":[
             {
                "name":"",
                "type":"address"
             }
          ],
          "name":"verifiedBy",
          "outputs":[
             {
                "name":"",
                "type":"bool"
             }
          ],
          "payable":false,
          "type":"function"
       },
       {
          "constant":true,
          "inputs":[
 
          ],
          "name":"owner",
          "outputs":[
             {
                "name":"",
                "type":"address"
             }
          ],
          "payable":false,
          "type":"function"
       },
       {
          "constant":false,
          "inputs":[
             {
                "name":"newOwner",
                "type":"address"
             }
          ],
          "name":"transferOwnership",
          "outputs":[
 
          ],
          "payable":false,
          "type":"function"
       },
       {
          "constant":true,
          "inputs":[
 
          ],
          "name":"offChainLocation",
          "outputs":[
             {
                "name":"",
                "type":"string"
             }
          ],
          "payable":false,
          "type":"function"
       },
       {
          "constant":false,
          "inputs":[
 
          ],
          "name":"verify",
          "outputs":[
 
          ],
          "payable":false,
          "type":"function"
       },
       {
          "inputs":[
             {
                "name":"_rootHash",
                "type":"string"
             },
             {
                "name":"_offChainLocation",
                "type":"string"
             }
          ],
          "payable":false,
          "type":"constructor"
       },
       {
          "anonymous":false,
          "inputs":[
             {
                "indexed":true,
                "name":"previousOwner",
                "type":"address"
             },
             {
                "indexed":true,
                "name":"newOwner",
                "type":"address"
             }
          ],
          "name":"OwnershipTransferred",
          "type":"event"
       }
    ],
    "bytecode":"0x<left out>",
    "networks":{
       "4":{
          "events":{
             "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0":{
                "anonymous":false,
                "inputs":[
                   {
                      "indexed":true,
                      "name":"previousOwner",
                      "type":"address"
                   },
                   {
                      "indexed":true,
                      "name":"newOwner",
                      "type":"address"
                   }
                ],
                "name":"OwnershipTransferred",
                "type":"event"
             }
          },
          "links":{
 
          },
          "address":"0x99c78eb5d386ec7faeca9b3f8eb03bbccdc160fa",
          "updated_at":1508799654698
       },
       "1508776411310":{
          "events":{
             "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0":{
                "anonymous":false,
                "inputs":[
                   {
                      "indexed":true,
                      "name":"previousOwner",
                      "type":"address"
                   },
                   {
                      "indexed":true,
                      "name":"newOwner",
                      "type":"address"
                   }
                ],
                "name":"OwnershipTransferred",
                "type":"event"
             }
          },
          "links":{
 
          },
          "address":"0xbd61f20b89d20c892c4e7efd3fcf50305b733eda",
          "updated_at":1508777002215
       },
       "1508777042262":{
          "events":{
             "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0":{
                "anonymous":false,
                "inputs":[
                   {
                      "indexed":true,
                      "name":"previousOwner",
                      "type":"address"
                   },
                   {
                      "indexed":true,
                      "name":"newOwner",
                      "type":"address"
                   }
                ],
                "name":"OwnershipTransferred",
                "type":"event"
             }
          },
          "links":{
 
          },
          "address":"0x919cd607c6464aa58b8710f261638c7113d0bc20",
          "updated_at":1508777057099
       }
    },
    "schemaVersion":"1.0.0",
    "updatedAt":"2017-10-25T00:05:06.378Z"
 };


 const getAbiJson = (abiName) => {
    let ret;
    switch (abiName) {
        case 'Entity':
            ret = JSON.parse('{ "contract_name": "Entity", "abi": [ { "constant": false, "inputs": [ { "name": "_offChainLocation", "type": "string" } ], "name": "setOffChainLocation", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "_verifier", "type": "address" } ], "name": "wasVerifiedBy", "outputs": [ { "name": "wasVerified", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "getOffChainLocation", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "getRootHash", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "verifiedBy", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "offChainLocation", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "verify", "outputs": [], "payable": false, "type": "function" }, { "inputs": [ { "name": "_rootHash", "type": "string" }, { "name": "_offChainLocation", "type": "string" } ], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } ], "unlinked_binary": "0x6060604052341561000f57600080fd5b6040516108b23803806108b28339810160405280805182019190602001805190910190505b805b5b825b600081805161004c929160200190610089565b505b5060028054600160a060020a03191633600160a060020a03161790555b600381805161007e929160200190610089565b505b505b5050610129565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100ca57805160ff19168380011785556100f7565b828001600101855582156100f7579182015b828111156100f75782518255916020019190600101906100dc565b5b50610104929150610108565b5090565b61012691905b80821115610104576000815560010161010e565b5090565b90565b61077a806101386000396000f300606060405236156100965763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306315413811461009b57806349696f99146100ee5780635c4843d71461012157806380759f1f146101ac57806383bfcf1f146102375780638da5cb5b1461026a578063f2fde38b14610299578063f49081fa146102ba578063fc735e9914610345575b600080fd5b34156100a657600080fd5b6100ec60046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284375094965061035a95505050505050565b005b34156100f957600080fd5b61010d600160a060020a036004351661038e565b604051901515815260200160405180910390f35b341561012c57600080fd5b6101346103c6565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101715780820151818401525b602001610158565b50505050905090810190601f16801561019e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101b757600080fd5b61013461046f565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101715780820151818401525b602001610158565b50505050905090810190601f16801561019e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561024257600080fd5b61010d600160a060020a0360043516610518565b604051901515815260200160405180910390f35b341561027557600080fd5b61027d61052d565b604051600160a060020a03909116815260200160405180910390f35b34156102a457600080fd5b6100ec600160a060020a036004351661053c565b005b34156102c557600080fd5b6101346105d5565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101715780820151818401525b602001610158565b50505050905090810190601f16801561019e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561035057600080fd5b6100ec610673565b005b60025433600160a060020a0390811691161461037557600080fd5b600381805161038892916020019061069c565b505b5b50565b600160a060020a038116600090815260016020819052604082205460ff16151514156103bc575060016103c0565b5060005b5b919050565b6103ce61071b565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104645780601f1061043957610100808354040283529160200191610464565b820191906000526020600020905b81548152906001019060200180831161044757829003601f168201915b505050505090505b90565b61047761071b565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104645780601f1061043957610100808354040283529160200191610464565b820191906000526020600020905b81548152906001019060200180831161044757829003601f168201915b505050505090505b90565b60016020526000908152604090205460ff1681565b600254600160a060020a031681565b60025433600160a060020a0390811691161461055757600080fd5b600160a060020a038116151561056c57600080fd5b600254600160a060020a0380831691167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36002805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b60038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561066b5780601f106106405761010080835404028352916020019161066b565b820191906000526020600020905b81548152906001019060200180831161064e57829003601f168201915b505050505081565b600160a060020a0333166000908152600160208190526040909120805460ff191690911790555b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106106dd57805160ff191683800117855561070a565b8280016001018555821561070a579182015b8281111561070a5782518255916020019190600101906106ef565b5b5061071792915061072d565b5090565b60206040519081016040526000815290565b61046c91905b808211156107175760008155600101610733565b5090565b905600a165627a7a72305820b99e69408c437a8adff59b1b32307268e6e13ca6840f31703a8e78f1db58c1ba0029", "networks": { "4": { "events": { "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0x99c78eb5d386ec7faeca9b3f8eb03bbccdc160fa", "updated_at": 1508799654698 }, "1508776411310": { "events": { "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0xbd61f20b89d20c892c4e7efd3fcf50305b733eda", "updated_at": 1508777002215 }, "1508777042262": { "events": { "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0x919cd607c6464aa58b8710f261638c7113d0bc20", "updated_at": 1508777057099 } }, "schema_version": "0.0.5", "updated_at": 1508889906378 }');
            break;

        case 'EntityFactory':
            ret = JSON.parse('{ "contract_name": "EntityFactory", "abi": [ { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "rootHash", "type": "string" }, { "name": "offChainLocation", "type": "string" } ], "name": "createEntity", "outputs": [ { "name": "entity", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "entity", "type": "address" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "rootHash", "type": "string" }, { "indexed": false, "name": "offChainLocation", "type": "string" } ], "name": "EntityCreated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } ], "unlinked_binary": "0x60606040525b60008054600160a060020a03191633600160a060020a03161790555b5b610db8806100316000396000f300606060405263ffffffff60e060020a6000350416638da5cb5b811461003a57806397c5f12f14610069578063f2fde38b14610118575b600080fd5b341561004557600080fd5b61004d610139565b604051600160a060020a03909116815260200160405180910390f35b341561007457600080fd5b61004d60046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052818152929190602084018383808284375094965061014895505050505050565b604051600160a060020a03909116815260200160405180910390f35b341561012357600080fd5b610137600160a060020a0360043516610431565b005b600054600160a060020a031681565b60008083836101556104ca565b808060200180602001838103835285818151815260200191508051906020019080838360005b838110156101945780820151818401525b60200161017b565b50505050905090810190601f1680156101c15780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156101f85780820151818401525b6020016101df565b50505050905090810190601f1680156102255780820380516001836020036101000a031916815260200191505b50945050505050604051809103906000f080151561024257600080fd5b905080600160a060020a031663f2fde38b3360405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401600060405180830381600087803b151561029257600080fd5b6102c65a03f115156102a357600080fd5b5050507f6239d82a3da68d5aaf2f2bc20eda2aea32bc9d859257b7078eb293aa558f01ba8182600160a060020a0316638da5cb5b6000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b151561030e57600080fd5b6102c65a03f1151561031f57600080fd5b505050604051805190508686604051600160a060020a03808616825284166020820152608060408201818152906060830190830185818151815260200191508051906020019080838360005b838110156103845780820151818401525b60200161036b565b50505050905090810190601f1680156103b15780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156103e85780820151818401525b6020016103cf565b50505050905090810190601f1680156104155780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a18091505b5092915050565b60005433600160a060020a0390811691161461044c57600080fd5b600160a060020a038116151561046157600080fd5b600054600160a060020a0380831691167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b6040516108b2806104db8339019056006060604052341561000f57600080fd5b6040516108b23803806108b28339810160405280805182019190602001805190910190505b805b5b825b600081805161004c929160200190610089565b505b5060028054600160a060020a03191633600160a060020a03161790555b600381805161007e929160200190610089565b505b505b5050610129565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100ca57805160ff19168380011785556100f7565b828001600101855582156100f7579182015b828111156100f75782518255916020019190600101906100dc565b5b50610104929150610108565b5090565b61012691905b80821115610104576000815560010161010e565b5090565b90565b61077a806101386000396000f300606060405236156100965763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306315413811461009b57806349696f99146100ee5780635c4843d71461012157806380759f1f146101ac57806383bfcf1f146102375780638da5cb5b1461026a578063f2fde38b14610299578063f49081fa146102ba578063fc735e9914610345575b600080fd5b34156100a657600080fd5b6100ec60046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284375094965061035a95505050505050565b005b34156100f957600080fd5b61010d600160a060020a036004351661038e565b604051901515815260200160405180910390f35b341561012c57600080fd5b6101346103c6565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101715780820151818401525b602001610158565b50505050905090810190601f16801561019e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101b757600080fd5b61013461046f565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101715780820151818401525b602001610158565b50505050905090810190601f16801561019e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561024257600080fd5b61010d600160a060020a0360043516610518565b604051901515815260200160405180910390f35b341561027557600080fd5b61027d61052d565b604051600160a060020a03909116815260200160405180910390f35b34156102a457600080fd5b6100ec600160a060020a036004351661053c565b005b34156102c557600080fd5b6101346105d5565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101715780820151818401525b602001610158565b50505050905090810190601f16801561019e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561035057600080fd5b6100ec610673565b005b60025433600160a060020a0390811691161461037557600080fd5b600381805161038892916020019061069c565b505b5b50565b600160a060020a038116600090815260016020819052604082205460ff16151514156103bc575060016103c0565b5060005b5b919050565b6103ce61071b565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104645780601f1061043957610100808354040283529160200191610464565b820191906000526020600020905b81548152906001019060200180831161044757829003601f168201915b505050505090505b90565b61047761071b565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104645780601f1061043957610100808354040283529160200191610464565b820191906000526020600020905b81548152906001019060200180831161044757829003601f168201915b505050505090505b90565b60016020526000908152604090205460ff1681565b600254600160a060020a031681565b60025433600160a060020a0390811691161461055757600080fd5b600160a060020a038116151561056c57600080fd5b600254600160a060020a0380831691167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36002805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b60038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561066b5780601f106106405761010080835404028352916020019161066b565b820191906000526020600020905b81548152906001019060200180831161064e57829003601f168201915b505050505081565b600160a060020a0333166000908152600160208190526040909120805460ff191690911790555b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106106dd57805160ff191683800117855561070a565b8280016001018555821561070a579182015b8281111561070a5782518255916020019190600101906106ef565b5b5061071792915061072d565b5090565b60206040519081016040526000815290565b61046c91905b808211156107175760008155600101610733565b5090565b905600a165627a7a72305820b99e69408c437a8adff59b1b32307268e6e13ca6840f31703a8e78f1db58c1ba0029a165627a7a723058209d611461526d742a896d960c1a4d52822d7010831b182946204067d72cccbecf0029", "networks": { "4": { "events": { "0x6239d82a3da68d5aaf2f2bc20eda2aea32bc9d859257b7078eb293aa558f01ba": { "anonymous": false, "inputs": [ { "indexed": false, "name": "entity", "type": "address" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "rootHash", "type": "string" }, { "indexed": false, "name": "offChainLocation", "type": "string" } ], "name": "EntityCreated", "type": "event" }, "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0xed306709e14e621def4db2c8f61495844d6d8ecb", "updated_at": 1508799654702 }, "1508776411310": { "events": { "0x6239d82a3da68d5aaf2f2bc20eda2aea32bc9d859257b7078eb293aa558f01ba": { "anonymous": false, "inputs": [ { "indexed": false, "name": "entity", "type": "address" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "rootHash", "type": "string" }, { "indexed": false, "name": "offChainLocation", "type": "string" } ], "name": "EntityCreated", "type": "event" }, "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0xe7b2063fb81143cf4e468e8543b3f3e9e9526d86", "updated_at": 1508777002219 }, "1508777042262": { "events": { "0x6239d82a3da68d5aaf2f2bc20eda2aea32bc9d859257b7078eb293aa558f01ba": { "anonymous": false, "inputs": [ { "indexed": false, "name": "entity", "type": "address" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "rootHash", "type": "string" }, { "indexed": false, "name": "offChainLocation", "type": "string" } ], "name": "EntityCreated", "type": "event" }, "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0xdba9fa2df5cc7b528e926095cda8752d63d5c2dc", "updated_at": 1508777057103 }, "1508800375350": { "events": { "0x6239d82a3da68d5aaf2f2bc20eda2aea32bc9d859257b7078eb293aa558f01ba": { "anonymous": false, "inputs": [ { "indexed": false, "name": "entity", "type": "address" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "rootHash", "type": "string" }, { "indexed": false, "name": "offChainLocation", "type": "string" } ], "name": "EntityCreated", "type": "event" }, "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0x009777b22a0f1f94c47219940af59d679f7ef4ef", "updated_at": 1508802294243 }, "1508802331141": { "events": { "0x6239d82a3da68d5aaf2f2bc20eda2aea32bc9d859257b7078eb293aa558f01ba": { "anonymous": false, "inputs": [ { "indexed": false, "name": "entity", "type": "address" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "rootHash", "type": "string" }, { "indexed": false, "name": "offChainLocation", "type": "string" } ], "name": "EntityCreated", "type": "event" }, "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0xc32747eca2bfd8520b221549aaec8937be149915", "updated_at": 1508802393796 }, "1508889859631": { "events": { "0x6239d82a3da68d5aaf2f2bc20eda2aea32bc9d859257b7078eb293aa558f01ba": { "anonymous": false, "inputs": [ { "indexed": false, "name": "entity", "type": "address" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "rootHash", "type": "string" }, { "indexed": false, "name": "offChainLocation", "type": "string" } ], "name": "EntityCreated", "type": "event" }, "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0xc32747eca2bfd8520b221549aaec8937be149915", "updated_at": 1508889906662 }, "1508966496550": { "events": { "0x6239d82a3da68d5aaf2f2bc20eda2aea32bc9d859257b7078eb293aa558f01ba": { "anonymous": false, "inputs": [ { "indexed": false, "name": "entity", "type": "address" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "rootHash", "type": "string" }, { "indexed": false, "name": "offChainLocation", "type": "string" } ], "name": "EntityCreated", "type": "event" }, "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0xc32747eca2bfd8520b221549aaec8937be149915", "updated_at": 1508966507166 } }, "schema_version": "0.0.5", "updated_at": 1508966507166 }');
            break;

        default:
            break;
    }
    return ret;

}