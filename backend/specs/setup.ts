import fc from "fast-check";

fc.configureGlobal({ numRuns: parseInt(process.env.FAST_CHECK_EXAMPLES) });
