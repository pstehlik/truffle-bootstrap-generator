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
    const truffleContract = inst.loadAbi();
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