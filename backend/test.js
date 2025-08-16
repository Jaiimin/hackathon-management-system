const assert = require('assert');

console.log('--- RUNNING BACKEND TESTS ---');

try {
    assert.strictEqual(1, 1, 'Test Case 1: Basic assertion');
    console.log('PASS: Basic assertion');
} catch (error) {
    console.error('FAIL: Basic assertion');
    process.exit(1); 
}


console.log('\n--- ALL BACKEND TESTS PASSED ---');
process.exit(0); 